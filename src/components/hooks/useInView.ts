import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;

    // Delay observer creation to avoid blocking initial render
    const timeoutId = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          const inView = entry.isIntersecting;
          setIsInView(inView);

          if (inView && triggerOnce && !hasTriggered) {
            setHasTriggered(true);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(element);
    }, 100); // Small delay to ensure smooth initial load

    return () => {
      clearTimeout(timeoutId);
      if (observer && element) {
        observer.unobserve(element);
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    ref,
    isInView: triggerOnce ? (hasTriggered || isInView) : isInView,
  };
}