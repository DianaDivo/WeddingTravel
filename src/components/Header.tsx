import { memo, useState } from "react";
import { Button } from "./ui/button";
import { Menu, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "../contexts/LanguageContext";

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200" role="banner">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer" aria-label="WeddingTravel - Главная страница">
            <Heart className="h-6 w-6 text-rose-300 group-hover:text-rose-400 transition-colors duration-300" aria-hidden="true" />
            <span className="text-stone-800 group-hover:text-stone-900 transition-colors duration-300" style={{ fontSize: '1.5rem' }}>WeddingTravel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6" role="navigation" aria-label="Основная навигация">
            <Link to="/about" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/about') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.about')}
            </Link>
            <Link to="/services" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/services') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.services')}
            </Link>
            <Link to="/portfolio" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/portfolio') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.portfolio')}
            </Link>
            <Link to="/blog" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/blog') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.blog')}
            </Link>
            <Link to="/calculator" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/calculator') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.calculator')}
            </Link>
            <Link to="/contact" className={`transition-all duration-300 relative hover:scale-105 ${isActive('/contact') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`}>
              {t('header.contacts')}
            </Link>
          </nav>

          {/* Desktop - Language Switcher + CTA Button */}
          <div className="hidden xl:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button onClick={onBookingClick} className="bg-stone-800 hover:bg-stone-900 text-white px-6 hover-glow transition-all duration-300" aria-label={t('header.booking')}>
              {t('header.booking')}
            </Button>
          </div>

          {/* Tablet - Language + CTA Button + Menu Button */}
          <div className="hidden md:flex xl:hidden items-center space-x-3">
            <LanguageSwitcher />
            <Button onClick={onBookingClick} className="bg-stone-800 hover:bg-stone-900 text-white px-4 hover-glow transition-all duration-300">
              {t('header.booking')}
            </Button>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-stone-600" />
            </button>
          </div>

          {/* Mobile - Language + Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-6 w-6 text-stone-600" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 space-y-4 border-t border-stone-200 pt-4" role="navigation" aria-label="Мобильная навигация">
            <Link to="/about" className={`block transition-colors ${isActive('/about') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.about')}
            </Link>
            <Link to="/services" className={`block transition-colors ${isActive('/services') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.services')}
            </Link>
            <Link to="/portfolio" className={`block transition-colors ${isActive('/portfolio') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.portfolio')}
            </Link>
            <Link to="/blog" className={`block transition-colors ${isActive('/blog') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.blog')}
            </Link>
            <Link to="/calculator" className={`block transition-colors ${isActive('/calculator') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.calculator')}
            </Link>
            <Link to="/contact" className={`block transition-colors ${isActive('/contact') ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'}`} onClick={() => setIsMenuOpen(false)}>
              {t('header.contacts')}
            </Link>
            <Button onClick={() => { onBookingClick(); setIsMenuOpen(false); }} className="w-full bg-stone-800 hover:bg-stone-900 text-white mt-4 md:hidden">
              {t('header.booking')}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}