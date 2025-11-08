import { lazy, Suspense } from "react";
import { SectionSkeleton } from "../components/LoadingFallback";

// Load first two sections immediately for faster initial paint
import { Hero } from "../components/Hero";
import { Advantages } from "../components/Advantages";

// Lazy load rest of sections
const About = lazy(() => import("../components/About").then(m => ({ default: m.About || m.default })));
const Services = lazy(() => import("../components/Services").then(m => ({ default: m.Services || m.default })));
const Portfolio = lazy(() => import("../components/Portfolio").then(m => ({ default: m.Portfolio || m.default })));
const Blog = lazy(() => import("../components/Blog"));
const Calculator = lazy(() => import("../components/Calculator").then(m => ({ default: m.Calculator || m.default })));
const Contact = lazy(() => import("../components/Contact").then(m => ({ default: m.Contact || m.default })));

interface HomePageProps {
  onBookingClick: () => void;
}

export function HomePage({ onBookingClick }: HomePageProps) {
  const handleCalculatorClick = () => {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero 
        onBookingClick={onBookingClick} 
        onCalculatorClick={handleCalculatorClick}
      />
      
      <Advantages />
      
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Blog />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Calculator />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </>
  );
}
