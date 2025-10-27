import { useState, useMemo, memo } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Clock, ArrowRight, Calendar } from "lucide-react";

function BlogPageComponent() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => [
    { id: "all", label: t('blog.allCategories') },
    { id: "destinations", label: t('blogPage.categories.destinations') },
    { id: "planning", label: t('blogPage.categories.planning') },
    { id: "trends", label: t('blogPage.categories.trends') },
    { id: "realWeddings", label: t('blogPage.categories.realWeddings') }
  ], [t]);

  const articles = useMemo(() => [
    {
      id: 1,
      title: t('blogPage.articles.tuscanWedding.title'),
      excerpt: t('blogPage.articles.tuscanWedding.excerpt'),
      category: "destinations",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      date: t('blogPage.articles.tuscanWedding.date'),
      readTime: "8"
    },
    {
      id: 2,
      title: t('blogPage.articles.budgetPlanning.title'),
      excerpt: t('blogPage.articles.budgetPlanning.excerpt'),
      category: "planning",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
      date: t('blogPage.articles.budgetPlanning.date'),
      readTime: "6"
    },
    {
      id: 3,
      title: t('blogPage.articles.trends2025.title'),
      excerpt: t('blogPage.articles.trends2025.excerpt'),
      category: "trends",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      date: t('blogPage.articles.trends2025.date'),
      readTime: "10"
    },
    {
      id: 4,
      title: t('blogPage.articles.santoriniLove.title'),
      excerpt: t('blogPage.articles.santoriniLove.excerpt'),
      category: "realWeddings",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      date: t('blogPage.articles.santoriniLove.date'),
      readTime: "5"
    },
    {
      id: 5,
      title: t('blogPage.articles.documentation.title'),
      excerpt: t('blogPage.articles.documentation.excerpt'),
      category: "planning",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      date: t('blogPage.articles.documentation.date'),
      readTime: "7"
    },
    {
      id: 6,
      title: t('blogPage.articles.belarusEstates.title'),
      excerpt: t('blogPage.articles.belarusEstates.excerpt'),
      category: "destinations",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      date: t('blogPage.articles.belarusEstates.date'),
      readTime: "9"
    }
  ], [t]);

  const filteredArticles = useMemo(() => articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [articles, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl text-stone-800 mb-6">
              {t('blogPage.page.title')}
            </h1>
            <p className="text-xl text-stone-600 mb-8">
              {t('blogPage.page.subtitle')}
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <Input
                placeholder={t('blogPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id 
                  ? "bg-stone-800 hover:bg-stone-900 text-white" 
                  : "bg-white hover:bg-stone-50"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover-lift cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-stone-800 hover:bg-white">
                    {categories.find(c => c.id === article.category)?.label}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime} {t('blog.readTime')}
                    </div>
                  </div>
                  <h3 className="text-xl text-stone-800 mb-3">{article.title}</h3>
                  <p className="text-stone-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Button variant="ghost" className="text-rose-400 hover:text-rose-500 p-0">
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-stone-500">{t('blogPage.noResults')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl text-stone-800 mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              {t('blog.newsletter.description')}
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={t('blog.newsletter.placeholder')}
                className="bg-white"
              />
              <Button className="bg-rose-400 hover:bg-rose-500 text-white whitespace-nowrap">
                {t('blog.newsletter.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const BlogPage = memo(BlogPageComponent);
export default BlogPage;