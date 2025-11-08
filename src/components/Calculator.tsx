import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight, Calculator as CalculatorIcon } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

interface FormData {
  location: string;
  locationType: string;
  guestCount: string;
  season: string;
  format: string[];
  priorities: string[];
  service: string;
  extras: string[];
}

export function Calculator() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    location: "",
    locationType: "",
    guestCount: "",
    season: "",
    format: [],
    priorities: [],
    service: "",
    extras: []
  });

  const [showResult, setShowResult] = useState(false);

  const handleCheckboxChange = (value: string, field: 'format' | 'priorities' | 'extras') => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const calculateBudget = () => {
    // Simplified calculation logic
    let basePrice = 0;
    
    // Base price by location
    if (formData.location === "europe") basePrice = 25000;
    else if (formData.location === "asia") basePrice = 20000;
    else if (formData.location === "local") basePrice = 15000;
    
    // Multiply by guest count factor
    const guests = parseInt(formData.guestCount) || 50;
    const guestFactor = guests / 50;
    
    // Season multiplier
    const seasonMultiplier = formData.season === "peak" ? 1.3 : 1;
    
    const minBudget = Math.round(basePrice * guestFactor * seasonMultiplier);
    const maxBudget = Math.round(minBudget * 1.8);
    
    return { min: minBudget, max: maxBudget };
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const budget = showResult ? calculateBudget() : null;

  return (
    <section id="calculator" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-rose-400 mb-4">
            {t('calculator.subtitle')}
          </p>
          <h2 className="text-stone-800 mb-6">
            {t('calculator.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('calculator.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalculatorIcon className="h-5 w-5" />
                  <span>{t('calculator.formTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label>{t('calculator.geography.label')}</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({...prev, location: value}))}>
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
                  <Label>{t('calculator.locationType.label')}</Label>
                  <Select value={formData.locationType} onValueChange={(value) => setFormData(prev => ({...prev, locationType: value}))}>
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
                  <Label>{t('calculator.guestCount.label')}</Label>
                  <Input
                    type="number"
                    placeholder={t('calculator.guestCount.placeholder')}
                    value={formData.guestCount}
                    onChange={(e) => setFormData(prev => ({...prev, guestCount: e.target.value}))}
                  />
                </div>

                {/* Season */}
                <div className="space-y-2">
                  <Label>{t('calculator.season.label')}</Label>
                  <Select value={formData.season} onValueChange={(value) => setFormData(prev => ({...prev, season: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.season.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peak">{t('calculator.season.peak')}</SelectItem>
                      <SelectItem value="off-peak">{t('calculator.season.offPeak')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Format */}
                <div className="space-y-3">
                  <Label>{t('calculator.format.label')}</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'ceremony', label: t('calculator.format.ceremony') },
                      { value: 'dinner', label: t('calculator.format.dinner') },
                      { value: 'afterParty', label: t('calculator.format.afterParty') }
                    ].map((format) => (
                      <div key={format.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={format.value}
                          checked={formData.format.includes(format.value)}
                          onCheckedChange={() => handleCheckboxChange(format.value, "format")}
                        />
                        <Label htmlFor={format.value} className="cursor-pointer">{format.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <Label>{t('calculator.service.label')}</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({...prev, service: value}))}>
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
                  onClick={handleSubmit} 
                  className="w-full bg-stone-800 hover:bg-stone-900 text-white"
                >
                  {t('calculator.calculate')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Result */}
            <div className="space-y-6">
              {showResult && budget ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('calculator.resultTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="text-stone-800" style={{ fontSize: '1.875rem' }}>
                        ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}
                      </div>
                      <p className="text-sm text-stone-600">
                        {t('calculator.resultNote')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-stone-800">{t('calculator.breakdown.title')}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">{t('calculator.breakdown.venue')}</span>
                          <span className="text-stone-800">30-40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">{t('calculator.breakdown.catering')}</span>
                          <span className="text-stone-800">25-35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">{t('calculator.breakdown.decor')}</span>
                          <span className="text-stone-800">15-20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">{t('calculator.breakdown.photo')}</span>
                          <span className="text-stone-800">10-15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">{t('calculator.breakdown.coordination')}</span>
                          <span className="text-stone-800">5-10%</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white">
                      {t('calculator.getDetailedQuote')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                      <CalculatorIcon className="h-8 w-8 text-stone-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-stone-800">{t('calculator.emptyState.title')}</h3>
                      <p className="text-stone-600">
                        {t('calculator.emptyState.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Info */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-stone-800 mb-4">{t('calculator.included.title')}</h4>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li>• {t('calculator.included.concept')}</li>
                    <li>• {t('calculator.included.planning')}</li>
                    <li>• {t('calculator.included.production')}</li>
                    <li>• {t('calculator.included.coordination')}</li>
                    <li>• {t('calculator.included.postSupport')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}