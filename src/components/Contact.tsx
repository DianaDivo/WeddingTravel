import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, Mail, MessageCircle, Instagram, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    date: "",
    format: "",
    budget: "",
    story: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
  };

  return (
    <section id="contact" className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-rose-400 mb-4">
            {t('header.contacts')}
          </p>
          <h2 className="text-stone-800 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-stone-800 mb-6">{t('contact.form.title')}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t('contact.form.city')}</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                        placeholder={t('contact.form.cityPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t('contact.form.date')}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('contact.form.format')}</Label>
                      <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({...prev, format: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.form.formatPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="abroad">{t('contact.form.formatAbroad')}</SelectItem>
                          <SelectItem value="local">{t('contact.form.formatLocal')}</SelectItem>
                          <SelectItem value="both">{t('contact.form.formatBoth')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t('contact.form.budget')}</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({...prev, budget: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.form.budgetPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15-25k">$15,000 - $25,000</SelectItem>
                        <SelectItem value="25-40k">$25,000 - $40,000</SelectItem>
                        <SelectItem value="40-60k">$40,000 - $60,000</SelectItem>
                        <SelectItem value="60k+">$60,000+</SelectItem>
                        <SelectItem value="discuss">{t('contact.form.budgetDiscuss')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="story">{t('contact.form.story')}</Label>
                    <Textarea
                      id="story"
                      rows={4}
                      value={formData.story}
                      onChange={(e) => setFormData(prev => ({...prev, story: e.target.value}))}
                      placeholder={t('contact.form.storyPlaceholder')}
                    />
                  </div>

                  <p className="text-sm text-stone-500 italic">
                    {t('contact.form.note')}
                  </p>

                  <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white">
                    {t('contact.form.submit')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="h-8 w-8 text-green-600 rotate-45" />
                  </div>
                  <h3 className="text-stone-800">{t('contact.form.successTitle')}</h3>
                  <p className="text-stone-600">
                    {t('contact.form.successMessage')}
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-stone-300 text-stone-700"
                  >
                    {t('contact.form.anotherRequest')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-stone-800 mb-6">{t('contact.info.title')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-stone-600" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 mb-1">{t('contact.info.phone')}</h4>
                      <p className="text-stone-600">+375 29 580 58 55</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-stone-600" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 mb-1">{t('contact.info.email')}</h4>
                      <p className="text-stone-600">hello@weddingtravel.by</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-stone-600" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 mb-1">{t('contact.info.messengers')}</h4>
                      <p className="text-stone-600">WhatsApp / Telegram</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-5 w-5 text-stone-600" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 mb-1">Instagram</h4>
                      <a href="https://instagram.com/weddingtravel.by" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-800 transition-colors">
                        @weddingtravel.by
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-stone-800 mb-2">{t('contact.responseTime.title')}</h4>
                    <p className="text-stone-600 mb-4">
                      {t('contact.responseTime.description')}
                    </p>
                    <p className="text-sm text-stone-500">
                      {t('contact.responseTime.note')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h4 className="text-stone-800 mb-4">{t('contact.services.title')}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">{t('contact.services.full')}</span>
                    <span className="text-stone-800">{t('contact.services.fullValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">{t('contact.services.decor')}</span>
                    <span className="text-stone-800">{t('contact.services.decorValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">{t('contact.services.photo')}</span>
                    <span className="text-stone-800">{t('contact.services.photoValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">{t('contact.services.legal')}</span>
                    <span className="text-stone-800">{t('contact.services.legalValue')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}