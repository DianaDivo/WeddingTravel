import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useInView } from "../components/hooks/useInView";

export function AbroadWeddingsPage() {
  const { t } = useTranslation();
  const { ref: destinationsRef, isInView: destinationsInView } = useInView();
  const { ref: packagesRef, isInView: packagesInView } = useInView();
  const { ref: processRef, isInView: processInView } = useInView();

  const destinations = [
    {
      name: t('services.abroad.destinations.italy.name'),
      description: t('services.abroad.destinations.italy.description'),
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFseSUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NTgzODUxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.abroad.destinations.italy.highlight1'),
        t('services.abroad.destinations.italy.highlight2'),
        t('services.abroad.destinations.italy.highlight3')
      ]
    },
    {
      name: t('services.abroad.destinations.greece.name'),
      description: t('services.abroad.destinations.greece.description'),
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nfGVufDF8fHx8MTc1ODM4NTE4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.abroad.destinations.greece.highlight1'),
        t('services.abroad.destinations.greece.highlight2'),
        t('services.abroad.destinations.greece.highlight3')
      ]
    },
    {
      name: t('services.abroad.destinations.france.name'),
      description: t('services.abroad.destinations.france.description'),
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc1ODM4NTE5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.abroad.destinations.france.highlight1'),
        t('services.abroad.destinations.france.highlight2'),
        t('services.abroad.destinations.france.highlight3')
      ]
    }
  ];

  const packages = [
    {
      title: t('services.abroad.packages.bellaNotte.title'),
      description: t('services.abroad.packages.bellaNotte.description'),
      price: t('services.abroad.packages.bellaNotte.price'),
      includes: [
        t('services.abroad.packages.bellaNotte.include1'),
        t('services.abroad.packages.bellaNotte.include2'),
        t('services.abroad.packages.bellaNotte.include3'),
        t('services.abroad.packages.bellaNotte.include4')
      ],
      image: "https://images.unsplash.com/photo-1538677859585-f8d2193ffa2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2VkZGluZyUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1ODM4NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t('services.abroad.packages.whiteBlue.title'),
      description: t('services.abroad.packages.whiteBlue.description'),
      price: t('services.abroad.packages.whiteBlue.price'),
      includes: [
        t('services.abroad.packages.whiteBlue.include1'),
        t('services.abroad.packages.whiteBlue.include2'),
        t('services.abroad.packages.whiteBlue.include3'),
        t('services.abroad.packages.whiteBlue.include4')
      ],
      image: "https://images.unsplash.com/photo-1519123833858-f99014eb53c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjB3ZWRkaW5nJTIwd2hpdGUlMjBibHVlfGVufDF8fHx8MTc1ODM4NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const process = [
    {
      step: "1",
      title: t('services.abroad.process.step1.title'),
      description: t('services.abroad.process.step1.description')
    },
    {
      step: "2",
      title: t('services.abroad.process.step2.title'),
      description: t('services.abroad.process.step2.description')
    },
    {
      step: "3",
      title: t('services.abroad.process.step3.title'),
      description: t('services.abroad.process.step3.description')
    },
    {
      step: "4",
      title: t('services.abroad.process.step4.title'),
      description: t('services.abroad.process.step4.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBldXJvcGV8ZW58MXx8fHwxNzU4Mzg1MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt={t('services.abroad.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">
              {t('services.abroad.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('services.abroad.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('services.abroad.destinationsTitle')}
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {t('services.abroad.destinationsSubtitle')}
            </p>
          </div>

          <div 
            ref={destinationsRef}
            className={`space-y-20 transition-all duration-700 ${
              destinationsInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {destinations.map((destination, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-6 w-6 text-rose-400" />
                    <h3 className="text-2xl text-stone-800">{destination.name}</h3>
                  </div>
                  <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                    {destination.description}
                  </p>
                  <ul className="space-y-3">
                    {destination.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-stone-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="relative h-96 rounded-2xl overflow-hidden hover-lift">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('services.abroad.packagesTitle')}
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {t('services.abroad.packagesSubtitle')}
            </p>
          </div>

          <div 
            ref={packagesRef}
            className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto transition-all duration-700 ${
              packagesInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {packages.map((pkg, index) => (
              <Card key={index} className="overflow-hidden hover-lift">
                <div className="relative h-64">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl text-white mb-2">{pkg.title}</h3>
                    <p className="text-xl text-rose-300">{pkg.price}</p>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-stone-600 mb-6">{pkg.description}</p>
                  <div className="space-y-3 mb-6">
                    {pkg.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-stone-800 hover:bg-stone-900 text-white">
                    {t('services.abroad.button')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('services.abroad.processTitle')}
            </h2>
          </div>

          <div 
            ref={processRef}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto transition-all duration-700 ${
              processInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {process.map((item, index) => (
              <div 
                key={index}
                className="text-center space-y-4"
                style={{ animationDelay: processInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-rose-400">{item.step}</span>
                </div>
                <h3 className="text-xl text-stone-800">{item.title}</h3>
                <p className="text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}