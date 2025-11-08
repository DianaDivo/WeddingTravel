import { Button } from "./ui/button";
import { ArrowRight, Clock } from "lucide-react";
import heroImage from 'figma:asset/3d5fb146d35608a8d2c75b932c54dc7a5a49a432.png';
import { useTranslation } from "../contexts/LanguageContext";

interface HeroProps {
  onBookingClick: () => void;
  onCalculatorClick: () => void;
}

export function Hero({ onBookingClick, onCalculatorClick }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-50">
      {/* Background Image with deferred loading */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Romantic wedding couple in elegant floral arch"
          className="w-full h-full object-cover opacity-0"
          loading="lazy"
          decoding="async"
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          style={{ transition: 'opacity 0.3s ease-in' }}
        />
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">
                {t('hero.subtitle')}
              </div>
              <h1 className="text-4xl lg:text-6xl text-stone-800 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onBookingClick} size="lg" className="bg-stone-800 hover:bg-stone-900 text-white px-8 py-4">
                {t('hero.bookingButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={onCalculatorClick} variant="outline" size="lg" className="border-stone-300 text-stone-700 hover:bg-stone-50 px-8 py-4">
                {t('hero.calculatorButton')}
              </Button>
            </div>

            <div className="flex items-start space-x-2 text-sm text-stone-500 bg-stone-50 p-4 rounded-lg">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{t('contact.info.hoursText')}</p>
            </div>
          </div>

          {/* Trust Stats */}
          <div className="lg:pl-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              <h3 className="text-stone-800 mb-6">{t('hero.trustBlock.title')}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-stone-800 mb-2" style={{ fontSize: '1.875rem' }}>8+</div>
                  <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('hero.trustBlock.years')}</p>
                </div>
                <div className="text-center">
                  <div className="text-stone-800 mb-2" style={{ fontSize: '1.875rem' }}>17</div>
                  <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('hero.trustBlock.countries')}</p>
                </div>
                <div className="text-center">
                  <div className="text-stone-800 mb-2" style={{ fontSize: '1.875rem' }}>93%</div>
                  <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('hero.trustBlock.referrals')}</p>
                </div>
                <div className="text-center">
                  <div className="text-stone-800 mb-2" style={{ fontSize: '1.125rem' }}>♥</div>
                  <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('hero.trustBlock.values')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
