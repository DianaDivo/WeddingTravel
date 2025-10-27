import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useInView } from "../components/hooks/useInView";

export function ServicesPage() {
  const { t } = useTranslation();
  const { ref: servicesRef, isInView: servicesInView } = useInView();

  const services = [
    {
      title: t('services.abroad.title'),
      description: t('services.abroad.description'),
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBldXJvcGV8ZW58MXx8fHwxNzU4Mzg1MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/services/abroad",
      color: "rose"
    },
    {
      title: t('services.local.title'),
      description: t('services.local.description'),
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxhcnVzJTIwd2VkZGluZyUyMGVzdGF0ZXxlbnwxfHx8fDE3NTgzODUxODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/services/local",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl text-stone-800 mb-6">
              {t('services.page.title')}
            </h1>
            <p className="text-xl text-stone-600">
              {t('services.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div 
            ref={servicesRef}
            className={`grid md:grid-cols-2 gap-12 max-w-6xl mx-auto transition-all duration-700 ${
              servicesInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover-lift"
                style={{ animationDelay: servicesInView ? `${index * 200}ms` : '0ms' }}
              >
                <div className="relative h-80">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-3xl mb-3">{service.title}</h2>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <Link to={service.link}>
                    <Button className="w-full bg-stone-800 hover:bg-stone-900 text-white">
                      {t('services.page.learnMore')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-12 text-center">
              {t('services.page.whyChooseUs.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl text-stone-800 mb-4">
                  {t('services.page.whyChooseUs.reason1.title')}
                </h3>
                <p className="text-stone-600">
                  {t('services.page.whyChooseUs.reason1.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl text-stone-800 mb-4">
                  {t('services.page.whyChooseUs.reason2.title')}
                </h3>
                <p className="text-stone-600">
                  {t('services.page.whyChooseUs.reason2.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl text-stone-800 mb-4">
                  {t('services.page.whyChooseUs.reason3.title')}
                </h3>
                <p className="text-stone-600">
                  {t('services.page.whyChooseUs.reason3.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl text-stone-800 mb-4">
                  {t('services.page.whyChooseUs.reason4.title')}
                </h3>
                <p className="text-stone-600">
                  {t('services.page.whyChooseUs.reason4.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}