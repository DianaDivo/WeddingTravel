import { Link } from "react-router-dom";
import { Heart, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-stone-800 text-white" role="contentinfo">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-300" aria-hidden="true" />
              <span className="text-2xl">WeddingTravel</span>
            </div>
            <p className="text-stone-300 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <p className="text-stone-400 text-sm">{t('footer.stats.years')}</p>
              <p className="text-stone-400 text-sm">{t('footer.stats.countries')}</p>
              <p className="text-stone-400 text-sm">{t('footer.stats.referrals')}</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg">{t('footer.services.title')}</h3>
            <ul className="space-y-3 text-stone-300" role="list">
              <li>
                <Link to="/services/abroad" className="hover:text-white transition-colors">
                  {t('footer.services.abroad')}
                </Link>
              </li>
              <li>
                <Link to="/services/local" className="hover:text-white transition-colors">
                  {t('footer.services.local')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  {t('footer.services.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-white transition-colors">
                  {t('footer.services.calculator')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('footer.services.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg">{t('footer.contacts.title')}</h3>
            <ul className="space-y-3 text-stone-300">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href="tel:+375295805855" className="hover:text-white transition-colors">+375 29 580 58 55</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:hello@weddingtravel.by" className="hover:text-white transition-colors">hello@weddingtravel.by</a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{t('footer.contacts.location')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <a href="https://instagram.com/weddingtravel.by" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={`Instagram @weddingtravel.by`}>
                  @weddingtravel.by
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Destinations */}
        <div className="border-t border-stone-700 mt-12 pt-8">
          <h3 className="text-lg mb-6">{t('footer.destinations.title')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-stone-300">
            <div>
              <h4 className="text-white mb-2">{t('footer.destinations.europe.title')}</h4>
              <ul className="space-y-1">
                <li>{t('footer.destinations.europe.italy')}</li>
                <li>{t('footer.destinations.europe.greece')}</li>
                <li>{t('footer.destinations.europe.france')}</li>
                <li>{t('footer.destinations.europe.spain')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-2">{t('footer.destinations.asia.title')}</h4>
              <ul className="space-y-1">
                <li>{t('footer.destinations.asia.maldives')}</li>
                <li>{t('footer.destinations.asia.bali')}</li>
                <li>{t('footer.destinations.asia.thailand')}</li>
                <li>{t('footer.destinations.asia.srilanka')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-2">{t('footer.destinations.cis.title')}</h4>
              <ul className="space-y-1">
                <li>{t('footer.destinations.cis.belarus')}</li>
                <li>{t('footer.destinations.cis.russia')}</li>
                <li>{t('footer.destinations.cis.ukraine')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-stone-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 text-sm text-stone-400">
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}