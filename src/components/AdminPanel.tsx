import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Eye, EyeOff, Save, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import SeedData from './SeedData';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  imageUrl: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminPanelProps {
  onLogout: () => void;
  accessToken: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, accessToken }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
    fetchBlogPosts();
  }, []);

  const makeRequest = async (url: string, options: any = {}) => {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63${url}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/portfolio`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Ошибка загрузки портфолио');
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/blog`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Ошибка загрузки блога');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Ошибка загрузки изображения');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const savePortfolioItem = async (item: Partial<PortfolioItem>) => {
    try {
      if (editingPortfolio) {
        const data = await makeRequest(`/portfolio/${editingPortfolio.id}`, {
          method: 'PUT',
          body: JSON.stringify(item),
        });
        
        setPortfolioItems(prev => 
          prev.map(p => p.id === editingPortfolio.id ? data.data : p)
        );
        toast.success('Проект обновлен');
      } else {
        const data = await makeRequest('/portfolio', {
          method: 'POST',
          body: JSON.stringify(item),
        });
        
        setPortfolioItems(prev => [data.data, ...prev]);
        toast.success('Проект добавлен');
      }
      
      setIsPortfolioModalOpen(false);
      setEditingPortfolio(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      toast.error('Ошибка сохранения проекта');
    }
  };

  const saveBlogPost = async (post: Partial<BlogPost>) => {
    try {
      if (editingBlog) {
        const data = await makeRequest(`/blog/${editingBlog.id}`, {
          method: 'PUT',
          body: JSON.stringify(post),
        });
        
        setBlogPosts(prev => 
          prev.map(p => p.id === editingBlog.id ? data.data : p)
        );
        toast.success('Статья обновлена');
      } else {
        const data = await makeRequest('/blog', {
          method: 'POST',
          body: JSON.stringify(post),
        });
        
        setBlogPosts(prev => [data.data, ...prev]);
        toast.success('Статья добавлена');
      }
      
      setIsBlogModalOpen(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Ошибка сохранения статьи');
    }
  };

  const deletePortfolioItem = async (id: string) => {
    if (!confirm('Удалить проект?')) return;
    
    try {
      await makeRequest(`/portfolio/${id}`, {
        method: 'DELETE',
      });
      
      setPortfolioItems(prev => prev.filter(p => p.id !== id));
      toast.success('Проект удален');
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Ошибка удаления проекта');
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!confirm('Удалить статью?')) return;
    
    try {
      await makeRequest(`/blog/${id}`, {
        method: 'DELETE',
      });
      
      setBlogPosts(prev => prev.filter(p => p.id !== id));
      toast.success('Статья удалена');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Ошибка удаления статьи');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl text-gray-800">Админ-панель WeddingTravel</h1>
          <Button onClick={onLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="demo">Демо-данные</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Управление портфолио</h2>
              <Button
                onClick={() => {
                  setEditingPortfolio(null);
                  setIsPortfolioModalOpen(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                Добавить проект
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700">
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditingPortfolio(item);
                          setIsPortfolioModalOpen(true);
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Изменить
                      </Button>
                      <Button
                        onClick={() => deletePortfolioItem(item.id)}
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                        Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Управление блогом</h2>
              <Button
                onClick={() => {
                  setEditingBlog(null);
                  setIsBlogModalOpen(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                Новая статья
              </Button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? (
                              <><Eye className="w-3 h-3 mr-1" /> Опубликовано</>
                            ) : (
                              <><EyeOff className="w-3 h-3 mr-1" /> Черновик</>
                            )}
                          </Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="text-sm text-gray-500">
                          {post.publishedAt && `Опубликовано: ${new Date(post.publishedAt).toLocaleDateString('ru-RU')}`}
                          {post.tags.length > 0 && (
                            <span className="ml-4">
                              Теги: {post.tags.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => {
                            setEditingBlog(post);
                            setIsBlogModalOpen(true);
                          }}
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Изменить
                        </Button>
                        <Button
                          onClick={() => deleteBlogPost(post.id)}
                          size="sm"
                          variant="outline"
                          className="gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <div className="py-8">
              <SeedData accessToken={accessToken} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => {
          setIsPortfolioModalOpen(false);
          setEditingPortfolio(null);
        }}
        onSave={savePortfolioItem}
        onUpload={uploadImage}
        uploading={uploading}
        item={editingPortfolio}
      />

      {/* Blog Modal */}
      <BlogModal
        isOpen={isBlogModalOpen}
        onClose={() => {
          setIsBlogModalOpen(false);
          setEditingBlog(null);
        }}
        onSave={saveBlogPost}
        onUpload={uploadImage}
        uploading={uploading}
        post={editingBlog}
      />
    </div>
  );
};

// Portfolio Modal Component
const PortfolioModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<PortfolioItem>) => void;
  onUpload: (file: File) => Promise<string | null>;
  uploading: boolean;
  item: PortfolioItem | null;
}> = ({ isOpen, onClose, onSave, onUpload, uploading, item }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        location: item.location,
        category: item.category,
        imageUrl: item.imageUrl,
        date: item.date.split('T')[0],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        location: '',
        category: '',
        imageUrl: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [item]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await onUpload(file);
      if (url) {
        setFormData(prev => ({ ...prev, imageUrl: url }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {item ? 'Редактировать проект' : 'Добавить проект'}
          </DialogTitle>
          <DialogDescription>
            {item ? 'Внесите изменения в существующий проект портфолио' : 'Добавьте новый проект в ваше портфолио'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Локация</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Зарубежные свадьбы">Зарубежные свадьбы</SelectItem>
                  <SelectItem value="Выездные свадьбы">Выездные свадьбы</SelectItem>
                  <SelectItem value="Церемония">Церемония</SelectItem>
                  <SelectItem value="Декор">Декор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Изображение</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-gray-500">Загрузка...</p>}
              {formData.imageUrl && (
                <ImageWithFallback
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={uploading} className="bg-rose-600 hover:bg-rose-700">
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Blog Modal Component
const BlogModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Partial<BlogPost>) => void;
  onUpload: (file: File) => Promise<string | null>;
  uploading: boolean;
  post: BlogPost | null;
}> = ({ isOpen, onClose, onSave, onUpload, uploading, post }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    category: 'Общее',
    tags: '',
    published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl || '',
        category: post.category,
        tags: post.tags.join(', '),
        published: post.published,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        imageUrl: '',
        category: 'Общее',
        tags: '',
        published: false,
      });
    }
  }, [post]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await onUpload(file);
      if (url) {
        setFormData(prev => ({ ...prev, imageUrl: url }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onSave({
      ...formData,
      tags,
      imageUrl: formData.imageUrl || undefined,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? 'Редактировать статью' : 'Новая статья'}
          </DialogTitle>
          <DialogDescription>
            {post ? 'Внесите изменения в статью блога' : 'Создайте новую статью для блога'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Общее">Общее</SelectItem>
                  <SelectItem value="Планирование">Планирование</SelectItem>
                  <SelectItem value="Тренды">Тренды</SelectItem>
                  <SelectItem value="Локации">Локации</SelectItem>
                  <SelectItem value="Декор">Декор</SelectItem>
                  <SelectItem value="Советы">Советы</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="свадьба, планирование, декор"
            />
          </div>

          <div>
            <Label htmlFor="image">Изображение (опционально)</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-gray-500">Загрузка...</p>}
              {formData.imageUrl && (
                <ImageWithFallback
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published">Опубликовать</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={uploading} className="bg-rose-600 hover:bg-rose-700">
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;