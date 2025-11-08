import { useState, useMemo } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { MapPin, Users, Heart } from "lucide-react";

export function PortfolioPage() {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filters = useMemo(() => [
    { id: "all", label: t('portfolioPage.filters.all') },
    { id: "abroad", label: t('portfolioPage.filters.abroad') },
    { id: "local", label: t('portfolioPage.filters.local') },
    { id: "intimate", label: t('portfolioPage.filters.intimate') },
    { id: "grand", label: t('portfolioPage.filters.grand') }
  ], [t]);

  const projects = useMemo(() => [
    {
      id: 1,
      title: t('portfolioPage.projects.tuscanDream.title'),
      location: t('portfolioPage.projects.tuscanDream.location'),
      guests: 80,
      type: "abroad",
      scale: "grand",
      description: t('portfolioPage.projects.tuscanDream.description'),
      images: [
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200"
      ],
      testimonial: t('portfolioPage.projects.tuscanDream.testimonial')
    },
    {
      id: 2,
      title: t('portfolioPage.projects.santoriniSunset.title'),
      location: t('portfolioPage.projects.santoriniSunset.location'),
      guests: 30,
      type: "abroad",
      scale: "intimate",
      description: t('portfolioPage.projects.santoriniSunset.description'),
      images: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200",
        "https://images.unsplash.com/photo-1519123833858-f99014eb53c7?w=1200"
      ],
      testimonial: t('portfolioPage.projects.santoriniSunset.testimonial')
    },
    {
      id: 3,
      title: t('portfolioPage.projects.minskCastle.title'),
      location: t('portfolioPage.projects.minskCastle.location'),
      guests: 120,
      type: "local",
      scale: "grand",
      description: t('portfolioPage.projects.minskCastle.description'),
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
        "https://images.unsplash.com/photo-1582719366987-763cb13d8719?w=1200"
      ],
      testimonial: t('portfolioPage.projects.minskCastle.testimonial')
    },
    {
      id: 4,
      title: t('portfolioPage.projects.forestRetreat.title'),
      location: t('portfolioPage.projects.forestRetreat.location'),
      guests: 50,
      type: "local",
      scale: "intimate",
      description: t('portfolioPage.projects.forestRetreat.description'),
      images: [
        "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=1200",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200"
      ],
      testimonial: t('portfolioPage.projects.forestRetreat.testimonial')
    },
    {
      id: 5,
      title: t('portfolioPage.projects.parisianChic.title'),
      location: t('portfolioPage.projects.parisianChic.location'),
      guests: 60,
      type: "abroad",
      scale: "grand",
      description: t('portfolioPage.projects.parisianChic.description'),
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200"
      ],
      testimonial: t('portfolioPage.projects.parisianChic.testimonial')
    },
    {
      id: 6,
      title: t('portfolioPage.projects.wineryElegance.title'),
      location: t('portfolioPage.projects.wineryElegance.location'),
      guests: 70,
      type: "local",
      scale: "grand",
      description: t('portfolioPage.projects.wineryElegance.description'),
      images: [
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200"
      ],
      testimonial: t('portfolioPage.projects.wineryElegance.testimonial')
    }
  ], [t]);

  const filteredProjects = useMemo(() => projects.filter(project => {
    if (selectedFilter === "all") return true;
    return project.type === selectedFilter || project.scale === selectedFilter;
  }), [projects, selectedFilter]);

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl text-stone-800 mb-6">
              {t('portfolioPage.page.title')}
            </h1>
            <p className="text-xl text-stone-600">
              {t('portfolioPage.page.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className={selectedFilter === filter.id 
                  ? "bg-stone-800 hover:bg-stone-900 text-white" 
                  : "bg-white hover:bg-stone-50"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="overflow-hidden hover-lift cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl text-stone-800 mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-stone-600">
                      <MapPin className="h-4 w-4 text-rose-400" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <Users className="h-4 w-4 text-rose-400" />
                      {project.guests} {t('portfolio.guests')}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Badge variant="secondary">
                      {filters.find(f => f.id === project.type)?.label}
                    </Badge>
                    <Badge variant="outline">
                      {filters.find(f => f.id === project.scale)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">
            {selectedProject?.title || t('portfolioPage.projectDetails')}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedProject?.description || t('portfolioPage.projectDetailsDescription')}
          </DialogDescription>
          {selectedProject && (
            <div>
              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 gap-4 p-6">
                {selectedProject.images.map((image: string, idx: number) => (
                  <div key={idx} className={`relative ${idx === 0 ? 'md:col-span-2' : ''} h-80 rounded-lg overflow-hidden`}>
                    <ImageWithFallback
                      src={image}
                      alt={`${selectedProject.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Project Info */}
              <div className="p-8 bg-stone-50">
                <h2 className="text-3xl text-stone-800 mb-4">{selectedProject.title}</h2>
                <div className="flex gap-6 mb-6 text-stone-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-rose-400" />
                    {selectedProject.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rose-400" />
                    {selectedProject.guests} {t('portfolio.guests')}
                  </div>
                </div>
                <p className="text-lg text-stone-600 mb-6">{selectedProject.description}</p>
                
                {/* Testimonial */}
                <div className="bg-white rounded-lg p-6 border-l-4 border-rose-400">
                  <Heart className="h-6 w-6 text-rose-400 mb-3" />
                  <p className="text-stone-700 italic">"{selectedProject.testimonial}"</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl text-rose-400 mb-2">500+</div>
              <p className="text-stone-600">{t('portfolioPage.stats.weddings')}</p>
            </div>
            <div>
              <div className="text-4xl text-rose-400 mb-2">25+</div>
              <p className="text-stone-600">{t('portfolioPage.stats.countries')}</p>
            </div>
            <div>
              <div className="text-4xl text-rose-400 mb-2">98%</div>
              <p className="text-stone-600">{t('portfolioPage.stats.satisfaction')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}