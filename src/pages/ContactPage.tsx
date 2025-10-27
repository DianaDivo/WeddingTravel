import { useState, useCallback, useMemo } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Phone, Mail, MapPin, Instagram, Send, Clock, Globe, MessageCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(t('contact.form.successMessage'));
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  }, [t]);

  const contactInfo = useMemo(() => [
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: "+375 29 580 58 55",
      link: "tel:+375295805855"
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: "info@weddingtravel.by",
      link: "mailto:info@weddingtravel.by"
    },
    {
      icon: Instagram,
      label: t('contact.info.instagram'),
      value: "@weddingtravel.by",
      link: "https://instagram.com/weddingtravel.by"
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.info.locationValue'),
      link: null
    }
  ], [t]);

  const faqs = useMemo(() => [
    {
      question: t('contact.faq.question1'),
      answer: t('contact.faq.answer1')
    },
    {
      question: t('contact.faq.question2'),
      answer: t('contact.faq.answer2')
    },
    {
      question: t('contact.faq.question3'),
      answer: t('contact.faq.answer3')
    },
    {
      question: t('contact.faq.question4'),
      answer: t('contact.faq.answer4')
    },
    {
      question: t('contact.faq.question5'),
      answer: t('contact.faq.answer5')
    }
  ], [t]);

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl text-stone-800 mb-6">
              {t('contact.page.title')}
            </h1>
            <p className="text-xl text-stone-600">
              {t('contact.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl text-stone-800 mb-6">{t('contact.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-stone-800 mb-6">{t('contact.info.title')}</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg hover-lift">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-rose-400" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500 mb-1">{info.label}</div>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="text-stone-800 hover:text-rose-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-stone-800">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-rose-400" />
                    <h3 className="text-lg text-stone-800">{t('contact.hours.title')}</h3>
                  </div>
                  <div className="space-y-2 text-stone-600">
                    <div className="flex justify-between">
                      <span>{t('contact.hours.weekdays')}</span>
                      <span>{t('contact.hours.weekdaysTime')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contact.hours.saturday')}</span>
                      <span>{t('contact.hours.saturdayTime')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contact.hours.sunday')}</span>
                      <span>{t('contact.hours.sundayTime')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-rose-400" />
                    <h3 className="text-lg text-stone-800">{t('contact.social.title')}</h3>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex-1"
                      onClick={() => window.open('https://instagram.com/weddingtravel.by', '_blank')}
                    >
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex-1"
                      onClick={() => window.open('https://wa.me/375295805855', '_blank')}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-stone-800 mb-12 text-center">
              {t('contact.faq.title')}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-stone-800">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-stone-200">
        <div className="w-full h-full flex items-center justify-center text-stone-500">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>{t('contact.map.placeholder')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}