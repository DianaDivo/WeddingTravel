import { Heart, Globe, Shield, MapPin } from "lucide-react";
import { useInView } from "./hooks/useInView";
import { useTranslation } from "../contexts/LanguageContext";

export function Advantages() {
  const { t } = useTranslation();
  const { ref: titleRef, isInView: titleInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  const advantages = [
    {
      icon: Heart,
      title: t('advantages.individuality.title'),
      description: t('advantages.individuality.description')
    },
    {
      icon: Globe,
      title: t('advantages.aesthetics.title'),
      description: t('advantages.aesthetics.description')
    },
    {
      icon: Shield,
      title: t('advantages.control.title'),
      description: t('advantages.control.description')
    },
    {
      icon: MapPin,
      title: t('advantages.geography.title'),
      description: t('advantages.geography.description')
    }
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0-initial'
          }`}
        >
          <h2 className="text-stone-800 mb-6">
            {t('advantages.title')}
          </h2>
        </div>

        <div 
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
            gridInView ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-4 hover-lift cursor-pointer group"
                style={{ animationDelay: gridInView ? `${index * 150}ms` : '0ms' }}
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-rose-200 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-rose-400 group-hover:text-rose-500 transition-colors duration-300" />
                </div>
                <h3 className="text-stone-800 group-hover:text-stone-900 transition-colors duration-300">{advantage.title}</h3>
                <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}