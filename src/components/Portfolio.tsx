import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useInView } from "./hooks/useInView";
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useTranslation } from "../contexts/LanguageContext";

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

export function Portfolio() {
  const { t } = useTranslation();
  const { ref: titleRef, isInView: titleInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();
  const { ref: testimonialsRef, isInView: testimonialsInView } = useInView();
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback portfolio items for when no CMS data is available
  const fallbackPortfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1538677859585-f8d2193ffa2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2VkZGluZyUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1ODM4NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Тоскана, Италия",
      style: "Tuscan Romance",
      description: "Винодельня на закате, живая флористика, семейная атмосфера"
    },
    {
      image: "https://images.unsplash.com/photo-1519123833858-f99014eb53c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjB3ZWRkaW5nJTIwd2hpdGUlMjBibHVlfGVufDF8fHx8MTc1ODM4NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Санторини, Греция",
      style: "Minimal Elegance",
      description: "Белоснежная терраса, морской бриз, лаконичная красота"
    },
    {
      image: "https://images.unsplash.com/photo-1653936644618-b13b3357ce78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnQlMjB3aGl0ZSUyMHJvc2VzfGVufDF8fHx8MTc1ODM4NTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Прованс, Франция",
      style: "Garden Poetry",
      description: "Лавандовые поля, утончённые детали, французский шарм"
    },
    {
      image: "https://images.unsplash.com/photo-1551546897-0cf94d9bb428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMG1pbmltYWwlMjBlbGVnYW50fGVufDF8fHx8MTc1ODM4NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Усадьба, Беларусь",
      style: "Classic Beauty",
      description: "Историческая архитектура, пышная флористика, вечная классика"
    },
    {
      image: "https://images.unsplash.com/photo-1739216906046-afc47ed589fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBsdXh1cnklMjBtaW5pbWFsfGVufDF8fHx8MTc1ODM4NTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Подмосковье, Россия",
      style: "Modern Luxury",
      description: "Лофт-пространство, авторский декор, игра света и тени"
    },
    {
      image: "https://images.unsplash.com/photo-1698897050888-c18a15b6703e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwb3V0ZG9vciUyMG5hdHVyYWwlMjBsaWdodHxlbnwxfHx8fDE3NTgzODUxODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Озеро Нарочь, Беларусь",
      style: "Natural Romance",
      description: "Лесная поляна, природная архитектура, искренние эмоции"
    }
  ];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/portfolio`, {
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.data || []);
      } else {
        console.warn('Portfolio server response not ok:', response.status);
        setPortfolioItems([]);
      }
    } catch (error) {
      // Silently fall back to default portfolio items if CMS is unavailable
      console.log('CMS not available, using fallback portfolio data');
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Use CMS data if available, otherwise use fallback data
  const displayItems = portfolioItems.length > 0 ? portfolioItems : fallbackPortfolioItems;

  const testimonials = [
    {
      text: "Мы просто были вместе, а всё остальное происходило правильно",
      author: "Катя и Дима",
      location: "Тоскана"
    },
    {
      text: "Каждая деталь была продумана до мелочей, но при этом всё выглядело естественно",
      author: "Алёна и Максим",
      location: "Санторини"
    },
    {
      text: "Это был не просто праздник, а история, которую мы будем рассказывать всю жизнь",
      author: "Ира и Денис",
      location: "Усадьба Несвиж"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-rose-400 mb-4">
            {t('portfolio.subtitle')}
          </p>
          <h2 className="text-stone-800 mb-6">
            {t('portfolio.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-80 bg-gray-200"></div>
              </Card>
            ))
          ) : (
            displayItems.map((item, index) => {
              // Handle both CMS data and fallback data structure
              const isPortfolioItem = 'id' in item;
              const imageUrl = isPortfolioItem ? item.imageUrl : item.image;
              const location = isPortfolioItem ? item.location : item.location;
              const title = isPortfolioItem ? item.title : item.style;
              const description = isPortfolioItem ? item.description : item.description;
              const key = isPortfolioItem ? item.id : index;

              return (
                <Card 
                  key={key} 
                  className="overflow-hidden group cursor-pointer hover-lift transition-all duration-300"
                >
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={imageUrl}
                      alt={`${title} wedding in ${location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-sm opacity-90 mb-1">{location}</div>
                      <h3 className="mb-2">{title}</h3>
                      <p className="text-sm opacity-90">{description}</p>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-5 w-5 text-white ml-1" />
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Testimonials */}
        <div 
          ref={testimonialsRef}
          className="space-y-12 mb-16"
        >
          <h3 className="text-stone-800 text-center">Отзывы</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg border border-stone-200 text-center hover-lift group cursor-pointer"
              >
                <div className="text-4xl text-rose-300 mb-4 group-hover:text-rose-400 transition-colors duration-300">"</div>
                <p className="text-stone-600 italic mb-6 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                  {testimonial.text}
                </p>
                <div className="text-stone-800 group-hover:text-stone-900 transition-colors duration-300">
                  {testimonial.author}
                </div>
                <div className="text-sm text-stone-500 group-hover:text-stone-600 transition-colors duration-300">
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button className="bg-stone-800 hover:bg-stone-900 text-white hover-glow transition-all duration-300">
            {t('portfolio.viewStories')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}