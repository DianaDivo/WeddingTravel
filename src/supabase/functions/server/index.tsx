import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client for storage operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Initialize storage bucket for CMS images
async function initStorage() {
  const bucketName = 'make-f7a2cc63-cms';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    clearTimeout(timeoutId);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });
      if (error) {
        console.log(`Error creating bucket: ${error.message}`);
      } else {
        console.log(`Created bucket: ${bucketName}`);
      }
    }
  } catch (error) {
    console.log(`Storage initialization error: ${error}`);
  }
}

// Initialize storage on startup (non-blocking)
initStorage().catch(err => console.log('Storage init failed:', err));

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f7a2cc63/health", (c) => {
  return c.json({ status: "ok" });
});

// Authentication middleware for admin routes
async function requireAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Authorization token required' }, 401);
  }

  const authSupabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  );

  const { data: { user }, error } = await authSupabase.auth.getUser(accessToken);
  if (!user?.id || error) {
    return c.json({ error: 'Unauthorized access' }, 401);
  }

  c.set('userId', user.id);
  await next();
}

// Portfolio endpoints
app.get("/make-server-f7a2cc63/portfolio", async (c) => {
  try {
    const portfolioItems = await kv.getByPrefix('portfolio:');
    const items = portfolioItems.map(item => JSON.parse(item.value));
    return c.json({ success: true, data: items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
  } catch (error) {
    console.log(`Error fetching portfolio: ${error}`);
    return c.json({ error: 'Failed to fetch portfolio items' }, 500);
  }
});

app.post("/make-server-f7a2cc63/portfolio", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, location, category, imageUrl, date } = body;

    if (!title || !description || !location || !category || !imageUrl) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const portfolioItem = {
      id: crypto.randomUUID(),
      title,
      description,
      location,
      category,
      imageUrl,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`portfolio:${portfolioItem.id}`, JSON.stringify(portfolioItem));
    return c.json({ success: true, data: portfolioItem });
  } catch (error) {
    console.log(`Error creating portfolio item: ${error}`);
    return c.json({ error: 'Failed to create portfolio item' }, 500);
  }
});

app.put("/make-server-f7a2cc63/portfolio/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingData = await kv.get(`portfolio:${id}`);
    if (!existingData) {
      return c.json({ error: 'Portfolio item not found' }, 404);
    }

    const existingItem = JSON.parse(existingData);
    const updatedItem = {
      ...existingItem,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`portfolio:${id}`, JSON.stringify(updatedItem));
    return c.json({ success: true, data: updatedItem });
  } catch (error) {
    console.log(`Error updating portfolio item: ${error}`);
    return c.json({ error: 'Failed to update portfolio item' }, 500);
  }
});

app.delete("/make-server-f7a2cc63/portfolio/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingData = await kv.get(`portfolio:${id}`);
    if (!existingData) {
      return c.json({ error: 'Portfolio item not found' }, 404);
    }

    await kv.del(`portfolio:${id}`);
    return c.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    console.log(`Error deleting portfolio item: ${error}`);
    return c.json({ error: 'Failed to delete portfolio item' }, 500);
  }
});

// Blog endpoints
app.get("/make-server-f7a2cc63/blog", async (c) => {
  try {
    const blogPosts = await kv.getByPrefix('blog:');
    const posts = blogPosts.map(post => JSON.parse(post.value));
    return c.json({ success: true, data: posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) });
  } catch (error) {
    console.log(`Error fetching blog posts: ${error}`);
    return c.json({ error: 'Failed to fetch blog posts' }, 500);
  }
});

app.get("/make-server-f7a2cc63/blog/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const blogPosts = await kv.getByPrefix('blog:');
    const post = blogPosts.find(p => {
      const postData = JSON.parse(p.value);
      return postData.slug === slug;
    });

    if (!post) {
      return c.json({ error: 'Blog post not found' }, 404);
    }

    return c.json({ success: true, data: JSON.parse(post.value) });
  } catch (error) {
    console.log(`Error fetching blog post: ${error}`);
    return c.json({ error: 'Failed to fetch blog post' }, 500);
  }
});

app.post("/make-server-f7a2cc63/blog", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, excerpt, imageUrl, category, tags, published } = body;

    if (!title || !content || !excerpt) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const blogPost = {
      id: crypto.randomUUID(),
      title,
      slug,
      content,
      excerpt,
      imageUrl: imageUrl || null,
      category: category || 'Общее',
      tags: tags || [],
      published: published || false,
      publishedAt: published ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`blog:${blogPost.id}`, JSON.stringify(blogPost));
    return c.json({ success: true, data: blogPost });
  } catch (error) {
    console.log(`Error creating blog post: ${error}`);
    return c.json({ error: 'Failed to create blog post' }, 500);
  }
});

app.put("/make-server-f7a2cc63/blog/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingData = await kv.get(`blog:${id}`);
    if (!existingData) {
      return c.json({ error: 'Blog post not found' }, 404);
    }

    const existingPost = JSON.parse(existingData);
    const updatedPost = {
      ...existingPost,
      ...body,
      updatedAt: new Date().toISOString()
    };

    // Update slug if title changed
    if (body.title && body.title !== existingPost.title) {
      updatedPost.slug = body.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    // Set publishedAt if publishing for the first time
    if (body.published && !existingPost.published) {
      updatedPost.publishedAt = new Date().toISOString();
    }

    await kv.set(`blog:${id}`, JSON.stringify(updatedPost));
    return c.json({ success: true, data: updatedPost });
  } catch (error) {
    console.log(`Error updating blog post: ${error}`);
    return c.json({ error: 'Failed to update blog post' }, 500);
  }
});

app.delete("/make-server-f7a2cc63/blog/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingData = await kv.get(`blog:${id}`);
    if (!existingData) {
      return c.json({ error: 'Blog post not found' }, 404);
    }

    await kv.del(`blog:${id}`);
    return c.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    console.log(`Error deleting blog post: ${error}`);
    return c.json({ error: 'Failed to delete blog post' }, 500);
  }
});

// Image upload endpoint
app.post("/make-server-f7a2cc63/upload", requireAuth, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `cms/${fileName}`;

    const { data, error } = await supabase.storage
      .from('make-f7a2cc63-cms')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.log(`Upload error: ${error.message}`);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    // Create signed URL for the uploaded file
    const { data: signedUrl } = await supabase.storage
      .from('make-f7a2cc63-cms')
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

    return c.json({ 
      success: true, 
      data: { 
        url: signedUrl?.signedUrl,
        path: filePath 
      } 
    });
  } catch (error) {
    console.log(`Error uploading file: ${error}`);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Admin authentication endpoints
app.post("/make-server-f7a2cc63/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const authSupabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    const { data, error } = await authSupabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, data: { user: data.user } });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

Deno.serve(app.fetch);