import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, MapPin, Heart, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useInView } from "./hooks/useInView";
import { useTranslation } from "../contexts/LanguageContext";

export function Services() {
  const { t } = useTranslation();
  const { ref: abroadTitleRef, isInView: abroadTitleInView } = useInView();
  const { ref: destinationsRef, isInView: destinationsInView } = useInView();
  const { ref: localTitleRef, isInView: localTitleInView } = useInView();
  const { ref: locationsRef, isInView: locationsInView } = useInView();

  const abroadPackages = [
    {
      title: t('servicesSection.abroad.packages.bellaNotte.title'),
      description: t('servicesSection.abroad.packages.bellaNotte.description'),
      image: "https://images.unsplash.com/photo-1538677859585-f8d2193ffa2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2VkZGluZyUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1ODM4NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t('servicesSection.abroad.packages.whiteBlue.title'),
      description: t('servicesSection.abroad.packages.whiteBlue.description'),
      image: "https://images.unsplash.com/photo-1519123833858-f99014eb53c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjB3ZWRkaW5nJTIwd2hpdGUlMjBibHVlfGVufDF8fHx8MTc1ODM4NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const localCases = [
    {
      title: t('servicesSection.local.cases.forestLight.title'),
      description: t('servicesSection.local.cases.forestLight.description')
    },
    {
      title: t('servicesSection.local.cases.estateSunset.title'),
      description: t('servicesSection.local.cases.estateSunset.description')
    },
    {
      title: t('servicesSection.local.cases.castleBall.title'),
      description: t('servicesSection.local.cases.castleBall.description')
    }
  ];

  return (
    <div id="services" className="space-y-20">
      {/* Abroad Weddings */}
      <section id="abroad" className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div 
            ref={abroadTitleRef}
            className={`text-center mb-16 transition-all duration-700 ${
              abroadTitleInView ? 'animate-fade-in-up' : 'opacity-0-initial'
            }`}
          >
            <p className="text-sm uppercase tracking-wider text-rose-400 mb-4">
              {t('servicesSection.subtitle')}
            </p>
            <h2 className="text-stone-800 mb-6">
              {t('servicesSection.abroad.title')}
            </h2>
          </div>

          {/* Destinations */}
          <div 
            ref={destinationsRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${
              destinationsInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div 
              className="space-y-4 hover-lift cursor-pointer group"
              style={{ animationDelay: destinationsInView ? '0ms' : '0ms' }}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400 group-hover:text-rose-500 transition-colors duration-300" />
                <h3 className="text-stone-800 group-hover:text-stone-900 transition-colors duration-300">{t('servicesSection.abroad.destinations.italy.name')}</h3>
              </div>
              <p className="text-stone-600 group-hover:text-stone-700 transition-colors duration-300">
                {t('servicesSection.abroad.destinations.italy.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400" />
                <h3 className="text-stone-800">{t('servicesSection.abroad.destinations.greece.name')}</h3>
              </div>
              <p className="text-stone-600">
                {t('servicesSection.abroad.destinations.greece.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400" />
                <h3 className="text-stone-800">{t('servicesSection.abroad.destinations.france.name')}</h3>
              </div>
              <p className="text-stone-600">
                {t('servicesSection.abroad.destinations.france.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400" />
                <h3 className="text-stone-800">{t('servicesSection.abroad.destinations.maldives.name')}</h3>
              </div>
              <p className="text-stone-600">
                {t('servicesSection.abroad.destinations.maldives.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400" />
                <h3 className="text-stone-800">{t('servicesSection.abroad.destinations.spain.name')}</h3>
              </div>
              <p className="text-stone-600">
                {t('servicesSection.abroad.destinations.spain.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-400" />
                <h3 className="text-stone-800">{t('servicesSection.abroad.destinations.asia.name')}</h3>
              </div>
              <p className="text-stone-600">
                {t('servicesSection.abroad.destinations.asia.description')}
              </p>
            </div>
          </div>

          {/* Package Examples */}
          <div className="space-y-8 mb-12">
            <h3 className="text-stone-800 text-center">{t('servicesSection.abroad.packagesTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {abroadPackages.map((pkg, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-stone-800 mb-3">{pkg.title}</h4>
                    <p className="text-stone-600">{pkg.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-stone-800 hover:bg-stone-900 text-white">
              {t('servicesSection.abroad.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Local Weddings */}
      <section id="local" className="py-20">
        <div className="container mx-auto px-6">
          <div 
            ref={localTitleRef}
            className={`text-center mb-16 transition-all duration-700 ${
              localTitleInView ? 'animate-fade-in-up' : 'opacity-0-initial'
            }`}
          >
            <h2 className="text-stone-800 mb-6">
              {t('servicesSection.local.title')}
            </h2>
          </div>

          {/* Locations */}
          <div 
            ref={locationsRef}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-700 ${
              locationsInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div 
              className="text-center space-y-4 hover-lift cursor-pointer group"
              style={{ animationDelay: locationsInView ? '0ms' : '0ms' }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-amber-200 transition-colors duration-300">
                <Star className="h-8 w-8 text-amber-500 group-hover:text-amber-600 transition-colors duration-300" />
              </div>
              <h3 className="text-stone-800 group-hover:text-stone-900 transition-colors duration-300">{t('servicesSection.local.locations.castles.name')}</h3>
              <p className="text-stone-600 group-hover:text-stone-700 transition-colors duration-300" style={{ fontSize: '0.875rem' }}>{t('servicesSection.local.locations.castles.description')}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-stone-800">{t('servicesSection.local.locations.nature.name')}</h3>
              <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('servicesSection.local.locations.nature.description')}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-stone-800">{t('servicesSection.local.locations.wineries.name')}</h3>
              <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('servicesSection.local.locations.wineries.description')}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-stone-800">{t('servicesSection.local.locations.modern.name')}</h3>
              <p className="text-stone-600" style={{ fontSize: '0.875rem' }}>{t('servicesSection.local.locations.modern.description')}</p>
            </div>
          </div>

          {/* Cases */}
          <div className="space-y-8 mb-12">
            <h3 className="text-stone-800 text-center">{t('servicesSection.local.casesTitle')}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {localCases.map((caseItem, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-stone-200">
                  <h4 className="text-stone-800 mb-3">{caseItem.title}</h4>
                  <p className="text-stone-600">{caseItem.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-stone-800 hover:bg-stone-900 text-white">
              {t('servicesSection.local.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
