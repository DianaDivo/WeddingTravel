import { About } from "../components/About";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Heart, Users, Award, Globe } from "lucide-react";
import { useInView } from "../components/hooks/useInView";

export function AboutPage() {
  const { t } = useTranslation();
  const { ref: statsRef, isInView: statsInView } = useInView();
  const { ref: teamRef, isInView: teamInView } = useInView();

  const stats = [
    { icon: Heart, number: "500+", label: t('about.stats.weddings') },
    { icon: Globe, number: "25+", label: t('about.stats.countries') },
    { icon: Users, number: "1000+", label: t('about.stats.couples') },
    { icon: Award, number: "50+", label: t('about.stats.awards') }
  ];

  const team = [
    {
      name: t('about.team.member1.name'),
      role: t('about.team.member1.role'),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4Mzg1MTg0fDA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      name: t('about.team.member2.name'),
      role: t('about.team.member2.role'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4Mzg1MTg0fDA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      name: t('about.team.member3.name'),
      role: t('about.team.member3.role'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM4NTE4NXww&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-stone-800 mb-6">
              {t('about.page.title')}
            </h1>
            <p className="text-stone-600">
              {t('about.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <About />

      {/* Stats Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div 
            ref={statsRef}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
              statsInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 hover-lift"
                style={{ animationDelay: statsInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-10 w-10 text-rose-400" />
                </div>
                <div className="text-stone-800" style={{ fontSize: '2.25rem' }}>{stat.number}</div>
                <div className="text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-stone-800 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div 
            ref={teamRef}
            className={`grid md:grid-cols-3 gap-12 max-w-5xl mx-auto transition-all duration-700 ${
              teamInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {team.map((member, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 hover-lift"
                style={{ animationDelay: teamInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-stone-800">{member.name}</h3>
                  <p className="text-stone-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <h2 className="text-stone-800 mb-6 text-center">
                {t('about.mission.title')}
              </h2>
              <p className="text-stone-600 text-center leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}