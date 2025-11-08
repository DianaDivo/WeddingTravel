import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl text-stone-300 mb-4">404</h1>
            <h2 className="text-3xl lg:text-4xl text-stone-800 mb-4">
              {t('notFound.title')}
            </h2>
            <p className="text-xl text-stone-600 mb-8">
              {t('notFound.description')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-stone-800 hover:bg-stone-900 text-white w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                {t('notFound.homeButton')}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('notFound.backButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}