import { useEffect } from 'react';

/**
 * Компонент для оптимизации производительности сайта
 * - Preload критических ресурсов
 * - Prefetch следующих страниц
 * - Оптимизация шрифтов
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Preconnect to external domains for faster resource loading
    const preconnectDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // DNS prefetch for faster domain resolution
    const dnsPrefetchDomains = [
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Optimize font loading (без логирования для производительности)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Fonts loaded
      }).catch(() => {
        // Игнорируем ошибки
      });
    }

    // Lazy load images with Intersection Observer fallback
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all images with data-src
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach((img) => imageObserver.observe(img));
    }

    // Preload critical CSS (if needed)
    const criticalStyles = [
      // Add critical stylesheet URLs here if using external CSS
    ];

    criticalStyles.forEach(styleUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = styleUrl;
      document.head.appendChild(link);
    });

    // Resource hints for better performance
    const addResourceHint = (rel: string, href: string, as?: string) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute('as', as);
      document.head.appendChild(link);
    };

    // Preload hero image for faster initial paint
    const heroImages = [
      // Hero images will be loaded from figma:asset, so we skip preloading
    ];

    // Performance monitoring отключен для ускорения загрузки
    // Включите при необходимости отладки производительности

    // Cleanup
    return () => {
      // Remove observers if needed
    };
  }, []);

  return null;
}

/**
 * Utility function to preload an image
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Utility function to detect slow network
 */
export const isSlowNetwork = (): boolean => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      // Check for 2G or slow 3G
      return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
    }
  }
  return false;
};

/**
 * Utility function to check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Utility function for lazy loading components
 */
export const lazyLoadComponent = async (importFunc: () => Promise<any>) => {
  try {
    return await importFunc();
  } catch (error) {
    console.error('Error loading component:', error);
    return null;
  }
};
