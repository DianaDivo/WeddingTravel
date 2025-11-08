import { useTranslation } from "../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function CalculatorTranslationsDebug() {
  const { t, language } = useTranslation();

  const keys = [
    'calculator.subtitle',
    'calculator.title',
    'calculator.description',
    'calculator.page.title',
    'calculator.page.subtitle',
    'calculator.totalEstimate',
    'calculator.formTitle',
    'calculator.geography.label',
    'calculator.geography.placeholder',
    'calculator.calculate',
    'calculator.resultTitle',
    'calculator.resultNote',
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Отладка переводов калькулятора (язык: {language})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {keys.map((key) => (
            <div key={key} className="grid grid-cols-2 gap-4 p-2 border-b">
              <span className="text-stone-600 font-mono">{key}</span>
              <span className="text-stone-800">{t(key)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
