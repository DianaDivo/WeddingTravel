import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export function Breadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'about': t('header.about'),
    'services': t('header.services'),
    'abroad': t('services.abroad.breadcrumb'),
    'local': t('services.local.breadcrumb'),
    'portfolio': t('header.portfolio'),
    'blog': t('header.blog'),
    'calculator': t('header.calculator'),
    'contact': t('header.contacts')
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-stone-50 border-b border-stone-200">
      <div className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-stone-600 hover:text-stone-800 transition-colors"
              aria-label={t('breadcrumbs.home')}
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const breadcrumbName = breadcrumbNameMap[pathname] || pathname;

            return (
              <li key={pathname} className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 text-stone-400" />
                {isLast ? (
                  <span className="text-stone-800" aria-current="page">
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    {breadcrumbName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}