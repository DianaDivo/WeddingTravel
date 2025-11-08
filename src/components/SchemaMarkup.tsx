import { useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

export function SchemaMarkup() {
  const { t, language } = useTranslation();

  useEffect(() => {
    // Отложенная загрузка Schema Markup для ускорения начальной загрузки
    const timer = setTimeout(() => {
      // Get locale for schema
      const localeMap: Record<string, string> = {
        ru: 'ru_RU',
        en: 'en_US',
        be: 'be_BY'
      };
      const locale = localeMap[language] || 'ru_RU';

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://weddingtravel.by/#organization",
        "name": "WeddingTravel",
        "url": "https://weddingtravel.by",
        "description": t('schema.organizationDescription'),
        "logo": {
          "@type": "ImageObject",
          "url": "https://weddingtravel.by/logo.png",
          "width": 250,
          "height": 60
        },
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "+375-29-580-58-55",
          "contactType": "customer service",
          "email": "hello@weddingtravel.by",
          "areaServed": ["BY", "RU", "IT", "GR", "FR"],
          "availableLanguage": t('schema.availableLanguages')
        }],
        "sameAs": [
          "https://instagram.com/weddingtravel.by"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BY",
          "addressLocality": language === 'en' ? 'Minsk' : language === 'be' ? 'Мінск' : 'Минск'
        }
      };

      // Local Business Schema
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://weddingtravel.by/#localbusiness",
        "name": "WeddingTravel",
        "description": t('schema.serviceDescription'),
        "url": "https://weddingtravel.by",
        "telephone": "+375-29-580-58-55",
        "email": "hello@weddingtravel.by",
        "priceRange": "$$$",
        "image": "https://images.unsplash.com/photo-5197414974-611481863552?q=80&w=1200",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BY",
          "addressLocality": language === 'en' ? 'Minsk' : language === 'be' ? 'Мінск' : 'Минск'
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "53.9006",
          "longitude": "27.5590"
        },
        "openingHoursSpecification": [{
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "19:00"
        }],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        },
        "inLanguage": locale
      };

      // Country names based on language
      const getCountryName = (key: string): string => {
        const countryNames: Record<string, Record<string, string>> = {
          italy: { ru: 'Италия', en: 'Italy', be: 'Італія' },
          greece: { ru: 'Греция', en: 'Greece', be: 'Грэцыя' },
          france: { ru: 'Франция', en: 'France', be: 'Францыя' },
          spain: { ru: 'Испания', en: 'Spain', be: 'Іспанія' },
          portugal: { ru: 'Португалия', en: 'Portugal', be: 'Партугалія' },
          maldives: { ru: 'Мальдивы', en: 'Maldives', be: 'Мальдывы' },
          thailand: { ru: 'Таиланд', en: 'Thailand', be: 'Тайланд' },
          bali: { ru: 'Бали', en: 'Bali', be: 'Балі' },
          belarus: { ru: 'Беларусь', en: 'Belarus', be: 'Беларусь' },
          russia: { ru: 'Россия', en: 'Russia', be: 'Расія' }
        };
        return countryNames[key]?.[language] || countryNames[key]?.ru || '';
      };

      // Service Schema for Destination Weddings
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://weddingtravel.by/#service",
        "serviceType": "Destination Wedding Planning",
        "provider": {
          "@id": "https://weddingtravel.by/#organization"
        },
        "areaServed": [
          { "@type": "Country", "name": getCountryName('italy') },
          { "@type": "Country", "name": getCountryName('greece') },
          { "@type": "Country", "name": getCountryName('france') },
          { "@type": "Country", "name": getCountryName('spain') },
          { "@type": "Country", "name": getCountryName('portugal') },
          { "@type": "Country", "name": getCountryName('maldives') },
          { "@type": "Country", "name": getCountryName('thailand') },
          { "@type": "Country", "name": getCountryName('bali') },
          { "@type": "Country", "name": getCountryName('belarus') },
          { "@type": "Country", "name": getCountryName('russia') }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": t('schema.packages.weddingPackages'),
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('schema.packages.italyName'),
              "description": t('schema.packages.italyDescription')
            }
          }, {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('schema.packages.greeceName'),
              "description": t('schema.packages.greeceDescription')
            }
          }, {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('schema.packages.belarusName'),
              "description": t('schema.packages.belarusDescription')
            }
          }]
        }
      };

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": t('schema.breadcrumbs.home'),
          "item": "https://weddingtravel.by"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": t('schema.breadcrumbs.abroad'),
          "item": "https://weddingtravel.by#abroad"
        }, {
          "@type": "ListItem",
          "position": 3,
          "name": t('schema.breadcrumbs.local'),
          "item": "https://weddingtravel.by#local"
        }, {
          "@type": "ListItem",
          "position": 4,
          "name": t('schema.breadcrumbs.portfolio'),
          "item": "https://weddingtravel.by#portfolio"
        }]
      };

      // FAQ Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": t('schema.faq.costQuestion'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('schema.faq.costAnswer')
          }
        }, {
          "@type": "Question",
          "name": t('schema.faq.documentsQuestion'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('schema.faq.documentsAnswer')
          }
        }, {
          "@type": "Question",
          "name": t('schema.faq.timingQuestion'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('schema.faq.timingAnswer')
          }
        }, {
          "@type": "Question",
          "name": t('schema.faq.destinationsQuestion'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('schema.faq.destinationsAnswer')
          }
        }]
      };

      // Combine all schemas
      const allSchemas = {
        "@context": "https://schema.org",
        "@graph": [
          organizationSchema,
          localBusinessSchema,
          serviceSchema,
          breadcrumbSchema,
          faqSchema
        ]
      };

      // Add or update schema script
      let schemaScript = document.querySelector('script[data-schema="wedding-travel"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-schema', 'wedding-travel');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(allSchemas);
    }, 500); // Задержка 500ms для приоритета контента

    return () => clearTimeout(timer);
  }, [t, language]);

  return null;
}
