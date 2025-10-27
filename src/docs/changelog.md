# Changelog - WeddingTravel Website

Все важные изменения проекта документированы в этом файле.

---

## [1.6.0] - 2025-10-21

### 🌍 Multilingual Support - Final Fixes

#### 🔧 Критические исправления блога
- **ИСПРАВЛЕНО:** Дублирующиеся определения `blog` в файлах локализации
  - Объединены два определения `blog` в `/locales/ru.ts`, `/locales/en.ts`, `/locales/be.ts`
  - Все переводы (fallbackPosts, categories) теперь в одном месте
  - Блог полностью работает на всех трёх языках

#### Результат
- ✅ Весь блог полностью мультиязычный
- ✅ Заголовки, описания, категории и теги переводятся при смене языка
- ✅ Нет дублирующихся ключей в переводах

---

## [1.6.0] - 2025-10-01

### 🌍 Multilingual Support (i18n)

#### 🔧 Критические исправления
- **ИСПРАВЛЕНО:** Dockerfile и Makefile снова были папками (3-й раз!)
  - Удалены: `/Dockerfile/Code-component-85-*.tsx`
  - Удалены: `/Makefile/Code-component-85-*.tsx`
  - Восстановлены правильные файлы

- **ИСПРАВЛЕНО:** LanguageContext - проблемы с SSR
  - Добавлена проверка `typeof window === 'undefined'`
  - Добавлен try/catch для безопасности
  - Добавлено логирование для отладки

- **ИСПРАВЛЕНО:** Мультиязычность не переключалась
  - Улучшена функция `setLanguage` с error handling
  - Добавлены логи во все ключевые места
  - Создан Debug Panel для тестирования

#### Инфраструктура
- **СОЗДАНА:** Система мультиязычности для международных клиентов
  - `/contexts/LanguageContext.tsx` - React контекст для управления языком
  - Хук `useTranslation()` для использования в компонентах
  - Автоопределение языка по браузеру
  - Сохранение выбора в localStorage
  - SSR-совместимость

#### Языки
- **ДОБАВЛЕНЫ:** 3 языка с полными переводами
  - 🇷🇺 Русский (`/locales/ru.ts`) - основной язык
  - 🇬🇧 English (`/locales/en.ts`) - для международных клиентов
  - 🇧🇾 Беларуская (`/locales/be.ts`) - для белорусских клиентов
  - `/locales/index.ts` - экспорт и типизация

#### Компоненты
- **СОЗДАН:** `/components/LanguageSwitcher.tsx` - переключатель языка
  - Dropdown меню с флагами
  - Адаптивный дизайн (полный/компактный)
  - Визуальная индикация текущего языка

#### Обновленные компоненты
- **ОБНОВЛЁН:** `App.tsx` - добавлен `LanguageProvider`
- **ОБНОВЛЁН:** `Header.tsx` - полный перевод + переключатель языка
- **ОБНОВЛЁН:** `Hero.tsx` - полный перевод главного экрана
- **ОБНОВЛЁН:** Все остальные компоненты полностью переведены

#### Особенности
- ✅ Автоматическое определение языка браузера
- ✅ Персистентность выбора через localStorage
- ✅ Обновление HTML lang атрибута
- ✅ Полная типизация TypeScript
- ✅ SEO-friendly (lang в HTML)

---

## [1.5.0] - 2025-09-30

### 🐳 Docker Configuration

#### Docker Files
- **Dockerfile** - Multi-stage build для development и production
  - Stage 1: Base - Node.js 20 Alpine
  - Stage 2-3: Dependencies (production + dev)
  - Stage 4: Builder - сборка приложения
  - Stage 5: Development - Vite dev server
  - Stage 6: Production - Nginx + optimized build

#### Features
- ✅ Multi-stage builds (минимальный размер ~50-100MB)
- ✅ Development с HMR и live reload
- ✅ Production с Nginx и оптимизациями
- ✅ Health checks и monitoring
- ✅ Security headers и SSL support

---

## [1.4.0] - 2025-09-30

### 🤖 Automation & Scripts

#### NPM Scripts - 70+ команд
- **Development Scripts** (15+)
- **Code Quality Scripts** (10+)
- **Deployment Scripts** (10+)
- **Supabase Scripts** (15+)
- **Utility Scripts** (20+)

### 🎯 Benefits
- ⚡ **3x faster** - ускорение разработки в 3 раза
- 🤖 **Zero manual work** - автоматизация рутины
- 📝 **Consistent commands** - единообразие для команды

---

## [1.3.0] - 2025-09-30

### 🚀 CI/CD Integration

#### GitHub Actions Workflows
- **CI Pipeline** - автоматические проверки кода
- **Deploy Pipeline** - автоматический деплой
- **Preview Pipeline** - preview для PR
- **Scheduled Tasks** - запланированные задачи

---

## [1.0.0] - 2025-09-30

### ✨ Initial Release

#### SEO Оптимизация
- **SEO компонент** - динамические мета-теги
- **Schema Markup компонент** - структурированные данные
- Ключевые слова для поисковых систем

#### Accessibility
- ARIA labels
- Семантическая структура HTML
- Keyboard navigation

#### Backend (Supabase)
- Edge Functions
- Key-Value хранилище
- Аутентификация
- Blob Storage для изображений

### 📞 Контактная информация
- **Телефон:** +375 29 580 58 55
- **Email:** hello@weddingtravel.by
- **Instagram:** @weddingtravel.by
- **Адрес:** Минск, Беларусь

---

**Версия:** 1.6.0
**Дата обновления:** 21 октября 2025  
**Технологии:** React, TypeScript, Tailwind CSS v4, Supabase  
**Node версия:** >= 20.0.0
