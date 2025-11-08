import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingFallback } from "./components/LoadingFallback";
import { LanguageProvider } from "./contexts/LanguageContext";

// Critical components - load immediately
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";

// Non-critical - lazy load
const SEO = lazy(() => import("./components/SEO").then(m => ({ default: m.SEO })));
const SchemaMarkup = lazy(() => import("./components/SchemaMarkup").then(m => ({ default: m.SchemaMarkup })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));
const BookingModal = lazy(() => import("./components/BookingModal").then(m => ({ default: m.BookingModal })));
const Toaster = lazy(() => import("./components/ui/sonner").then(m => ({ default: m.Toaster })));
const CMSProvider = lazy(() => import("./components/CMSProvider"));

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const AbroadWeddingsPage = lazy(() => import("./pages/AbroadWeddingsPage").then(m => ({ default: m.AbroadWeddingsPage })));
const LocalWeddingsPage = lazy(() => import("./pages/LocalWeddingsPage").then(m => ({ default: m.LocalWeddingsPage })));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage").then(m => ({ default: m.CalculatorPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

function AppContent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showNonCritical, setShowNonCritical] = useState(false);

  // Load non-critical components after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNonCritical(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onBookingClick={handleBookingClick} />
      
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage onBookingClick={handleBookingClick} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/abroad" element={<AbroadWeddingsPage />} />
            <Route path="/services/local" element={<LocalWeddingsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      
      {showNonCritical && (
        <>
          <Suspense fallback={null}>
            <SEO />
          </Suspense>
          
          <Suspense fallback={null}>
            <SchemaMarkup />
          </Suspense>
          
          <Suspense fallback={<div className="py-8" />}>
            <Footer />
          </Suspense>
          
          <Suspense fallback={null}>
            <BookingModal 
              isOpen={isBookingModalOpen} 
              onClose={() => setIsBookingModalOpen(false)} 
            />
          </Suspense>
          
          <Suspense fallback={null}>
            <Toaster 
              richColors 
              position="top-right"
              closeButton
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [showCMS, setShowCMS] = useState(false);

  // Delay CMS loading even more
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCMS(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        {showCMS ? (
          <Suspense fallback={<AppContent />}>
            <CMSProvider>
              <AppContent />
            </CMSProvider>
          </Suspense>
        ) : (
          <AppContent />
        )}
      </LanguageProvider>
    </Router>
  );
}
