import { Button } from "./ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useInView } from "./hooks/useInView";
import { useTranslation } from "../contexts/LanguageContext";

export function About() {
  const { t } = useTranslation();
  const { ref: contentRef, isInView: contentInView } = useInView();
  const { ref: imageRef, isInView: imageInView } = useInView();

  const benefits = [
    t('aboutSection.benefits.expertise'),
    t('aboutSection.benefits.style'),
    t('aboutSection.benefits.precision'),
    t('aboutSection.benefits.legal')
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={contentRef}
            className={`space-y-8 transition-all duration-700 ${
              contentInView ? 'animate-slide-in-left' : 'opacity-0-left'
            }`}
          >
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wider text-rose-400">
                {t('aboutSection.subtitle')}
              </p>
              <h2 className="text-stone-800">
                {t('aboutSection.title')}
              </h2>
              <p className="text-stone-600 leading-relaxed">
                {t('aboutSection.description')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-300 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-stone-600">
                  <span className="text-stone-800">{t('aboutSection.focus.label')}</span> {t('aboutSection.focus.text')}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-300 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-stone-600">
                  <span className="text-stone-800">{t('aboutSection.approach.label')}</span> {t('aboutSection.approach.text')}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-300 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-stone-600">
                  <span className="text-stone-800">{t('aboutSection.value.label')}</span> {t('aboutSection.value.text')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-stone-800">{t('aboutSection.whyChooseUs')}</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-stone-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-stone-800 hover:bg-stone-900 text-white hover-glow transition-all duration-300">
              {t('aboutSection.discussButton')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div 
            ref={imageRef}
            className={`lg:pl-8 transition-all duration-700 ${
              imageInView ? 'animate-slide-in-right' : 'opacity-0-right'
            }`}
          >
            <div className="relative hover-scale cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551546897-0cf94d9bb428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMG1pbmltYWwlMjBlbGVnYW50fGVufDF8fHx8MTc1ODM4NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Elegant wedding flowers arrangement"
                className="w-full h-[600px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
