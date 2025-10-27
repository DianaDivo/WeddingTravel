import { useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage = 'https://images.unsplash.com/photo-5197414974-611481863552?q=80&w=1200',
  canonicalUrl = 'https://weddingtravel.by'
}: SEOProps = {}) {
  const { t, language } = useTranslation();
  
  // Use provided values or fall back to translations
  const pageTitle = title || t('seo.title');
  const pageDescription = description || t('seo.description');
  const pageKeywords = keywords || t('seo.keywords');
  
  useEffect(() => {
    // Set page title
    document.title = pageTitle;

    // Set or update meta tags (optimized)
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMeta('description', pageDescription);
    updateMeta('keywords', pageKeywords);
    
    // Open Graph tags
    updateProperty('og:title', pageTitle);
    updateProperty('og:description', pageDescription);
    updateProperty('og:image', ogImage);
    updateProperty('og:url', canonicalUrl);
    updateProperty('og:type', 'website');
    
    // Twitter tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', pageTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:image', ogImage);
    
    // Language
    document.documentElement.lang = language;
  }, [pageTitle, pageDescription, pageKeywords, ogImage, canonicalUrl, language]);

  return null;
}
