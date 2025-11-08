import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useTranslation } from '../contexts/LanguageContext';

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

function Blog() {
  const { t, language } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  const { ref, inView } = useInView();

  // Reset category when language changes
  useEffect(() => {
    setSelectedCategory(t('blog.allCategories'));
  }, [language, t]);

  // Fallback blog posts for when no CMS data is available - now multilingual
  const fallbackBlogPosts = useMemo((): BlogPost[] => {
    // Category translations map
    const categoryTranslations: { [key: string]: string } = {
      'locations': t('blog.categories.locations'),
      'planning': t('blog.categories.planning'),
      'trends': t('blog.categories.trends'),
    };

    // Tags for each post by language
    const tagsByPostAndLang: { [key: string]: { [lang: string]: string[] } } = {
      'post1': {
        ru: ['европа', 'локации', 'зарубежные свадьбы', 'тоскана', 'санторини'],
        en: ['europe', 'destinations', 'abroad', 'tuscany', 'santorini'],
        be: ['еўропа', 'лакацыі', 'замежныя вясельні', 'таскана', 'сантарыні'],
      },
      'post2': {
        ru: ['планирование', 'чек-лист', 'организация', 'подготовка'],
        en: ['planning', 'checklist', 'organization', 'preparation'],
        be: ['планаванне', 'чэк-ліст', 'арганізацыя', 'падрыхтоўка'],
      },
      'post3': {
        ru: ['тренды 2024', 'стиль', 'декор', 'современные свадьбы'],
        en: ['trends 2024', 'style', 'decor', 'modern weddings'],
        be: ['тэндэнцыі 2024', 'стыль', 'дэкор', 'сучасныя вясельні'],
      },
      'post4': {
        ru: ['беларусь', 'выездные свадьбы', 'замки', 'природа', 'несвиж'],
        en: ['belarus', 'outdoor', 'castles', 'nature', 'nesvizh'],
        be: ['беларусь', 'выязныя вясельні', 'замкі', 'прырода', 'нясвіж'],
      },
      'post5': {
        ru: ['бюджет', 'планирование', 'экономия', 'расходы', 'деньги'],
        en: ['budget', 'planning', 'savings', 'expenses', 'money'],
        be: ['бюджэт', 'планаванне', 'эканомія', 'выдаткі', 'грошы'],
      },
      'post6': {
        ru: ['азия', 'зарубежные свадьбы', 'бали', 'таиланд', 'экзотика'],
        en: ['asia', 'abroad', 'bali', 'thailand', 'exotic'],
        be: ['азія', 'замежныя вясельні', 'балі', 'тайланд', 'экзотыка'],
      },
    };

    const posts = [
      {
        id: 'fallback-1',
        key: 'post1',
        slug: 'best-european-wedding-venues',
        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjB3ZWRkaW5nJTIwdmVudWUlMjByb21hbnRpY3xlbnwxfHx8fDE3NTgzODUxODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryKey: 'locations',
        publishedAt: '2024-11-15T10:00:00.000Z',
      },
      {
        id: 'fallback-2',
        key: 'post2',
        slug: 'wedding-planning-checklist',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjBub3RlYm9vayUyMGNoZWNrbGlzdHxlbnwxfHx8fDE3NTgzODUxODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryKey: 'planning',
        publishedAt: '2024-11-10T10:00:00.000Z',
      },
      {
        id: 'fallback-3',
        key: 'post3',
        slug: 'wedding-trends-2024',
        imageUrl: 'https://images.unsplash.com/photo-1606800052300-5d5a37f843db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdHJlbmRzJTIwMjAyNCUyMGZsb3dlcnN8ZW58MXx8fHwxNzU4Mzg1MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryKey: 'trends',
        publishedAt: '2024-11-05T10:00:00.000Z',
      },
      {
        id: 'fallback-4',
        key: 'post4',
        slug: 'belarus-wedding-venues',
        imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxhcnVzJTIwY2FzdGxlJTIwd2VkZGluZyUyMGhpc3RvcmljfGVufDF8fHx8MTc1ODM4NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        categoryKey: 'locations',
        publishedAt: '2024-11-01T10:00:00.000Z',
      },
      {
        id: 'fallback-5',
        key: 'post5',
        slug: 'wedding-budget-planning',
        imageUrl: 'https://images.unsplash.com/photo-1682802142549-b72576d31d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnVkZ2V0JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzYxNTU4NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        categoryKey: 'planning',
        publishedAt: '2024-10-25T10:00:00.000Z',
      },
      {
        id: 'fallback-6',
        key: 'post6',
        slug: 'asian-wedding-destinations',
        imageUrl: 'https://images.unsplash.com/photo-1691419140246-c09c0d0f9bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJlYWNoJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc2MTU1ODc1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        categoryKey: 'locations',
        publishedAt: '2024-10-20T10:00:00.000Z',
      },
    ];

    return posts.map(post => ({
      id: post.id,
      title: t(`blog.fallbackPosts.${post.key}.title`),
      slug: post.slug,
      content: t(`blog.fallbackPosts.${post.key}.content`),
      excerpt: t(`blog.fallbackPosts.${post.key}.excerpt`),
      imageUrl: post.imageUrl,
      category: categoryTranslations[post.categoryKey] || post.categoryKey,
      tags: tagsByPostAndLang[post.key]?.[language] || tagsByPostAndLang[post.key]?.['ru'] || [],
      published: true,
      publishedAt: post.publishedAt,
      createdAt: post.publishedAt,
      updatedAt: post.publishedAt,
    }));
  }, [language, t]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/blog`, {
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // Show only published posts
        setBlogPosts(data.data?.filter((post: BlogPost) => post.published) || []);
      } else {
        // Silently fall back to default blog posts
        console.log('CMS response not ok, using fallback blog data');
        setBlogPosts([]);
      }
    } catch (error) {
      // Silently fall back to default blog posts if CMS is unavailable
      console.log('CMS not available, using fallback blog data');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Use CMS data if available, otherwise use fallback data
  const displayPosts = blogPosts.length > 0 ? blogPosts : fallbackBlogPosts;
  const categories = [t('blog.allCategories'), ...new Set(displayPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory === t('blog.allCategories') 
    ? displayPosts 
    : displayPosts.filter(post => post.category === selectedCategory);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const formatDate = (dateString: string) => {
    const localeMap: { [key: string]: string } = {
      ru: 'ru-RU',
      en: 'en-US',
      be: 'be-BY',
    };
    
    return new Date(dateString).toLocaleDateString(localeMap[language] || 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} ${t('blog.readTime')}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-rose-50/30 to-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-rose-400 mb-4">
            {t('blog.subtitle')}
          </p>
          <h2 className="mb-6">
            {t('blog.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('blog.description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisiblePosts(6);
              }}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {displayedPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-gray-600 mb-4">{t('blog.noArticles')}</h3>
            <p className="text-gray-500">{t('blog.tryAnotherCategory')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer border-0 shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {post.imageUrl ? (
                      <ImageWithFallback
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                        <span className="text-rose-400 text-6xl">💒</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-rose-600 hover:bg-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getReadingTime(post.content)}
                      </div>
                    </div>
                    
                    <h3 className="mb-3 group-hover:text-rose-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-rose-600 hover:text-rose-700 group/btn"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {visiblePosts < filteredPosts.length && (
              <div className="text-center">
                <Button
                  onClick={() => setVisiblePosts(prev => prev + 6)}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full"
                >
                  {t('blog.loadMore')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Blog;