import { useState, useCallback, useMemo } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useTranslation } from "../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { CheckCircle2, DollarSign, MapPin, Users, Calendar, Sparkles } from "lucide-react";

export function CalculatorPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    geography: "",
    locationType: "",
    guestCount: "",
    season: "",
    ceremony: false,
    dinner: false,
    afterParty: false,
    service: ""
  });
  const [result, setResult] = useState<any>(null);

  const calculatePrice = useCallback(() => {
    const basePrice = {
      europe: 25000,
      asia: 20000,
      local: 15000
    };

    const locationMultiplier = {
      castle: 1.3,
      winery: 1.2,
      beach: 1.1,
      garden: 1.0,
      modern: 1.1
    };

    const seasonMultiplier = {
      peak: 1.2,
      offPeak: 0.85
    };

    const serviceMultiplier = {
      full: 1.0,
      coordination: 0.4,
      partial: 0.7
    };

    let total = basePrice[formData.geography as keyof typeof basePrice] || 15000;
    total *= locationMultiplier[formData.locationType as keyof typeof locationMultiplier] || 1;
    total *= seasonMultiplier[formData.season as keyof typeof seasonMultiplier] || 1;
    total *= serviceMultiplier[formData.service as keyof typeof serviceMultiplier] || 1;

    const guestCount = parseInt(formData.guestCount) || 50;
    total += guestCount * 150;

    if (formData.ceremony) total += 3000;
    if (formData.dinner) total += 5000;
    if (formData.afterParty) total += 2500;

    const breakdown = {
      venue: Math.round(total * 0.25),
      catering: Math.round(total * 0.35),
      decor: Math.round(total * 0.20),
      photo: Math.round(total * 0.12),
      coordination: Math.round(total * 0.08)
    };

    setResult({
      total: Math.round(total),
      breakdown,
      guests: guestCount
    });
  }, [formData]);

  const isFormValid = useMemo(() => 
    !!(formData.geography && formData.locationType && formData.guestCount && formData.season && formData.service),
    [formData]
  );

  const formProgress = useMemo(() => [
    formData.geography,
    formData.locationType,
    formData.guestCount,
    formData.season,
    formData.service
  ].filter(Boolean).length * 20, [formData]);

  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl text-stone-800 mb-6">
              {t('calculator.page.title')}
            </h1>
            <p className="text-xl text-stone-600">
              {t('calculator.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Form */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t('calculator.formTitle')}</span>
                  <span className="text-sm text-stone-500">{formProgress}%</span>
                </CardTitle>
                <Progress value={formProgress} className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Geography */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-rose-400" />
                    {t('calculator.geography.label')}
                  </Label>
                  <Select value={formData.geography} onValueChange={(v) => setFormData({...formData, geography: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.geography.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe">{t('calculator.geography.europe')}</SelectItem>
                      <SelectItem value="asia">{t('calculator.geography.asia')}</SelectItem>
                      <SelectItem value="local">{t('calculator.geography.local')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Type */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose-400" />
                    {t('calculator.locationType.label')}
                  </Label>
                  <Select value={formData.locationType} onValueChange={(v) => setFormData({...formData, locationType: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.locationType.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="castle">{t('calculator.locationType.castle')}</SelectItem>
                      <SelectItem value="winery">{t('calculator.locationType.winery')}</SelectItem>
                      <SelectItem value="beach">{t('calculator.locationType.beach')}</SelectItem>
                      <SelectItem value="garden">{t('calculator.locationType.garden')}</SelectItem>
                      <SelectItem value="modern">{t('calculator.locationType.modern')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-rose-400" />
                    {t('calculator.guestCount.label')}
                  </Label>
                  <Input 
                    type="number" 
                    placeholder={t('calculator.guestCount.placeholder')}
                    value={formData.guestCount}
                    onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                  />
                </div>

                {/* Season */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-rose-400" />
                    {t('calculator.season.label')}
                  </Label>
                  <Select value={formData.season} onValueChange={(v) => setFormData({...formData, season: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.season.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peak">{t('calculator.season.peak')}</SelectItem>
                      <SelectItem value="offPeak">{t('calculator.season.offPeak')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Format */}
                <div className="space-y-3">
                  <Label>{t('calculator.format.label')}</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ceremony" 
                        checked={formData.ceremony}
                        onCheckedChange={(checked) => setFormData({...formData, ceremony: checked as boolean})}
                      />
                      <label htmlFor="ceremony" className="text-sm cursor-pointer">
                        {t('calculator.format.ceremony')}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dinner" 
                        checked={formData.dinner}
                        onCheckedChange={(checked) => setFormData({...formData, dinner: checked as boolean})}
                      />
                      <label htmlFor="dinner" className="text-sm cursor-pointer">
                        {t('calculator.format.dinner')}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="afterParty" 
                        checked={formData.afterParty}
                        onCheckedChange={(checked) => setFormData({...formData, afterParty: checked as boolean})}
                      />
                      <label htmlFor="afterParty" className="text-sm cursor-pointer">
                        {t('calculator.format.afterParty')}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <Label>{t('calculator.service.label')}</Label>
                  <Select value={formData.service} onValueChange={(v) => setFormData({...formData, service: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.service.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">{t('calculator.service.full')}</SelectItem>
                      <SelectItem value="coordination">{t('calculator.service.coordination')}</SelectItem>
                      <SelectItem value="partial">{t('calculator.service.partial')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculatePrice} 
                  disabled={!isFormValid}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  {t('calculator.calculate')}
                </Button>
              </CardContent>
            </Card>

            {/* Result */}
            <Card className="lg:col-span-2 sticky top-6 h-fit">
              <CardHeader>
                <CardTitle>
                  {result ? t('calculator.resultTitle') : t('calculator.emptyState.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    {/* Total */}
                    <div className="text-center p-6 bg-rose-50 rounded-lg">
                      <div className="text-sm text-stone-600 mb-2">
                        {t('calculator.totalEstimate')}
                      </div>
                      <div className="text-4xl text-rose-600 mb-2">
                        ${result.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-stone-500">
                        {t('calculator.resultNote')}
                      </div>
                    </div>

                    <Separator />

                    {/* Breakdown */}
                    <div>
                      <h4 className="text-sm mb-4">{t('calculator.breakdown.title')}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">{t('calculator.breakdown.venue')}</span>
                          <span className="text-sm">${result.breakdown.venue.toLocaleString()}</span>
                        </div>
                        <Progress value={(result.breakdown.venue / result.total) * 100} className="h-1" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">{t('calculator.breakdown.catering')}</span>
                          <span className="text-sm">${result.breakdown.catering.toLocaleString()}</span>
                        </div>
                        <Progress value={(result.breakdown.catering / result.total) * 100} className="h-1" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">{t('calculator.breakdown.decor')}</span>
                          <span className="text-sm">${result.breakdown.decor.toLocaleString()}</span>
                        </div>
                        <Progress value={(result.breakdown.decor / result.total) * 100} className="h-1" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">{t('calculator.breakdown.photo')}</span>
                          <span className="text-sm">${result.breakdown.photo.toLocaleString()}</span>
                        </div>
                        <Progress value={(result.breakdown.photo / result.total) * 100} className="h-1" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">{t('calculator.breakdown.coordination')}</span>
                          <span className="text-sm">${result.breakdown.coordination.toLocaleString()}</span>
                        </div>
                        <Progress value={(result.breakdown.coordination / result.total) * 100} className="h-1" />
                      </div>
                    </div>

                    <Button className="w-full bg-stone-800 hover:bg-stone-900 text-white">
                      {t('calculator.getDetailedQuote')}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-stone-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">{t('calculator.emptyState.description')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Included Services */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-stone-800 mb-8 text-center">
              {t('calculator.included.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: 'concept', icon: Sparkles },
                { key: 'planning', icon: Calendar },
                { key: 'production', icon: CheckCircle2 },
                { key: 'coordination', icon: Users },
                { key: 'postSupport', icon: CheckCircle2 }
              ].map((item) => (
                <div key={item.key} className="flex gap-4 bg-white p-6 rounded-lg">
                  <item.icon className="h-6 w-6 text-rose-400 flex-shrink-0" />
                  <p className="text-stone-700">{t(`calculator.included.${item.key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}