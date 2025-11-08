import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useInView } from "../components/hooks/useInView";

export function LocalWeddingsPage() {
  const { t } = useTranslation();
  const { ref: locationsRef, isInView: locationsInView } = useInView();
  const { ref: casesRef, isInView: casesInView } = useInView();

  const locations = [
    {
      name: t('services.local.locations.castles.name'),
      description: t('services.local.locations.castles.detailedDescription'),
      image: "https://images.unsplash.com/photo-1582719366987-763cb13d8719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0bGUlMjB3ZWRkaW5nJTIwZXVyb3BlfGVufDF8fHx8MTc1ODM4NTE5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.local.locations.castles.highlight1'),
        t('services.local.locations.castles.highlight2'),
        t('services.local.locations.castles.highlight3')
      ]
    },
    {
      name: t('services.local.locations.nature.name'),
      description: t('services.local.locations.nature.detailedDescription'),
      image: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB3ZWRkaW5nJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4Mzg1MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.local.locations.nature.highlight1'),
        t('services.local.locations.nature.highlight2'),
        t('services.local.locations.nature.highlight3')
      ]
    },
    {
      name: t('services.local.locations.wineries.name'),
      description: t('services.local.locations.wineries.detailedDescription'),
      image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lcnklMjB3ZWRkaW5nfGVufDF8fHx8MTc1ODM4NTE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.local.locations.wineries.highlight1'),
        t('services.local.locations.wineries.highlight2'),
        t('services.local.locations.wineries.highlight3')
      ]
    },
    {
      name: t('services.local.locations.modern.name'),
      description: t('services.local.locations.modern.detailedDescription'),
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzU4Mzg1MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        t('services.local.locations.modern.highlight1'),
        t('services.local.locations.modern.highlight2'),
        t('services.local.locations.modern.highlight3')
      ]
    }
  ];

  const cases = [
    {
      title: t('services.local.cases.forestLight.title'),
      description: t('services.local.cases.forestLight.description'),
      details: t('services.local.cases.forestLight.details'),
      guests: t('services.local.cases.forestLight.guests'),
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB3ZWRkaW5nJTIwZGVjb3J8ZW58MXx8fHwxNzU4Mzg1MTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t('services.local.cases.estateSunset.title'),
      description: t('services.local.cases.estateSunset.description'),
      details: t('services.local.cases.estateSunset.details'),
      guests: t('services.local.cases.estateSunset.guests'),
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3RhdGUlMjB3ZWRkaW5nJTIwc3Vuc2V0fGVufDF8fHx8MTc1ODM4NTE5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t('services.local.cases.castleBall.title'),
      description: t('services.local.cases.castleBall.description'),
      details: t('services.local.cases.castleBall.details'),
      guests: t('services.local.cases.castleBall.guests'),
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0bGUlMjBiYWxscm9vbSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU4Mzg1MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxhcnVzJTIwd2VkZGluZyUyMGVzdGF0ZXxlbnwxfHx8fDE3NTgzODUxODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt={t('services.local.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">
              {t('services.local.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('services.local.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('services.local.locationsTitle')}
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {t('services.local.locationsSubtitle')}
            </p>
          </div>

          <div 
            ref={locationsRef}
            className={`space-y-20 transition-all duration-700 ${
              locationsInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {locations.map((location, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-6 w-6 text-green-500" />
                    <h3 className="text-2xl text-stone-800">{location.name}</h3>
                  </div>
                  <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                    {location.description}
                  </p>
                  <ul className="space-y-3">
                    {location.highlights.map((highlight, idx) => (
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
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('services.local.casesTitle')}
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {t('services.local.casesSubtitle')}
            </p>
          </div>

          <div 
            ref={casesRef}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${
              casesInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {cases.map((caseItem, index) => (
              <Card key={index} className="overflow-hidden hover-lift">
                <div className="relative h-64">
                  <ImageWithFallback
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl text-stone-800 mb-3">{caseItem.title}</h3>
                  <p className="text-stone-600 mb-4">{caseItem.description}</p>
                  <div className="space-y-2 text-sm text-stone-500">
                    <p>{caseItem.details}</p>
                    <p>{caseItem.guests}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-stone-800 to-stone-700 rounded-3xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl text-white mb-6">
              {t('services.local.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('services.local.cta.description')}
            </p>
            <Button className="bg-white text-stone-800 hover:bg-stone-100">
              {t('services.local.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}