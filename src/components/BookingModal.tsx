import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowRight, Heart, Clock } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    date: "",
    format: "",
    guestCount: "",
    budget: "",
    story: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      date: "",
      format: "",
      guestCount: "",
      budget: "",
      story: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
      >
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-2xl text-stone-800">
                <Heart className="h-6 w-6 text-rose-300" />
                <span>{t('booking.title')}</span>
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                {t('booking.description')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-name">{t('booking.form.name')}</Label>
                  <Input
                    id="modal-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder={t('booking.form.namePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-email">{t('booking.form.email')}</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder={t('booking.form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-phone">{t('booking.form.phone')}</Label>
                  <Input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder={t('booking.form.phonePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-city">{t('booking.form.city')}</Label>
                  <Input
                    id="modal-city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                    placeholder={t('booking.form.cityPlaceholder')}
                  />
                </div>
              </div>

              {/* Wedding Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-date">{t('booking.form.date')}</Label>
                  <Input
                    id="modal-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('booking.form.format')}</Label>
                  <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({...prev, format: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.form.formatPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abroad">{t('booking.form.formatAbroad')}</SelectItem>
                      <SelectItem value="local">{t('booking.form.formatLocal')}</SelectItem>
                      <SelectItem value="both">{t('booking.form.formatBoth')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-guests">{t('booking.form.guests')}</Label>
                  <Input
                    id="modal-guests"
                    type="number"
                    value={formData.guestCount}
                    onChange={(e) => setFormData(prev => ({...prev, guestCount: e.target.value}))}
                    placeholder={t('booking.form.guestsPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('booking.form.budget')}</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({...prev, budget: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.form.budgetPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-20k">{t('booking.form.budget1')}</SelectItem>
                      <SelectItem value="20-35k">{t('booking.form.budget2')}</SelectItem>
                      <SelectItem value="35-50k">{t('booking.form.budget3')}</SelectItem>
                      <SelectItem value="50k+">{t('booking.form.budget4')}</SelectItem>
                      <SelectItem value="discuss">{t('booking.form.budgetDiscuss')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-story">{t('booking.form.story')}</Label>
                <Textarea
                  id="modal-story"
                  rows={4}
                  value={formData.story}
                  onChange={(e) => setFormData(prev => ({...prev, story: e.target.value}))}
                  placeholder={t('booking.form.storyPlaceholder')}
                />
              </div>

              <div className="flex items-start space-x-2 text-sm text-stone-500 bg-stone-50 p-4 rounded-lg">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>{t('booking.form.nextSteps')}</strong> {t('booking.form.nextStepsText')}
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="flex-1 border-stone-300 text-stone-700"
                >
                  {t('booking.form.cancel')}
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-stone-800 hover:bg-stone-900 text-white"
                >
                  {t('booking.form.submit')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center space-x-2 text-2xl text-stone-800">
                <Heart className="h-6 w-6 text-rose-400" />
                <span>{t('booking.successTitle')}</span>
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                {t('booking.successDescription')}
              </DialogDescription>
            </DialogHeader>

            <div className="text-center space-y-6 py-4">
              <div className="space-y-4">
                <p className="text-stone-600 leading-relaxed">
                  {t('booking.successMessage')}
                </p>
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-stone-600">
                  <strong className="text-stone-800">{t('booking.successSteps.title')}</strong>
                </p>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• {t('booking.successSteps.step1')}</li>
                  <li>• {t('booking.successSteps.step2')}</li>
                  <li>• {t('booking.successSteps.step3')}</li>
                  <li>• {t('booking.successSteps.step4')}</li>
                </ul>
              </div>
            </div>
              <Button 
                onClick={handleClose}
                className="bg-stone-800 hover:bg-stone-900 text-white"
              >
                {t('booking.close')}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
