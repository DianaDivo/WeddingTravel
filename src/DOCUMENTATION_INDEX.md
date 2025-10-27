# 📚 Документация WeddingTravel

Полный индекс всей документации проекта.

---

## 🚀 КРИТИЧНО: Деплой

**⚠️ Сайт НЕ задеплоен!** Выберите свой путь:

### 🟢 Для новичков (БЕЗ терминала!)
1. **[SIMPLE_STEPS.md](./SIMPLE_STEPS.md)** ⭐ - Деплой за 10 минут через GitHub Desktop
2. **[HOW_TO_DEPLOY.md](./HOW_TO_DEPLOY.md)** 📖 - Где вводить команды + инструкции

### 🟡 Для опытных (через терминал)
1. **[START_HERE.md](./START_HERE.md)** ⚡ - Быстрый старт
2. **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** 📖 - Полная инструкция
3. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** ✅ - Чеклист

### 📊 Статус проекта
- **[CURRENT_STATUS.md](./CURRENT_STATUS.md)** - Что готово, что нужно сделать

---

## 🚀 Быстрый старт

**Новичок в проекте?** Начните отсюда:

1. **[Quick Start](./docs/quick-start.md)** - Начало работы за 5 минут
2. **[Project Summary](./docs/project-summary.md)** - Обзор всего проекта
3. **[Commands](./docs/commands.md)** - Справка всех команд

---

## 📖 Основные разделы

### 🌍 Мультиязычность (i18n)
- **[I18N Quick Start](./docs/i18n/quickstart.md)** - Начало работы с переводами
- **[I18N Guide](./docs/i18n/guide.md)** - Полное руководство по мультиязычности

**Статус:** ✅ Все компоненты переведены на 3 языка (🇷🇺 🇬🇧 🇧🇾)

### 🤖 Автоматизация
- **[Automation Guide](./docs/automation.md)** - 70+ npm скриптов для разработки
- **[Commands Reference](./docs/commands.md)** - Быстрая справка команд

### 🚢 Деплой и DevOps

**⚠️ НАЧНИТЕ ЗДЕСЬ:**
- **[START_HERE.md](./START_HERE.md)** ⭐ - ЧТО ДЕЛАТЬ ПРЯМО СЕЙЧАС
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** ⭐ - Пошаговый деплой на Vercel

**Подробные гайды:**
- **[Deployment Flow](./docs/deployment/deployment-flow.md)** - Визуальная схема процесса
- **[Vercel Setup](./docs/deployment/vercel-setup.md)** - CLI и Dashboard
- **[Domain Setup](./docs/deployment/domain-setup.md)** - Настройка weddingtravel.by
- **[Docker Guide](./docker/README.md)** - Контейнеризация
- **CI/CD** - GitHub Actions workflows (см. `/.github/workflows/`)

### 📝 Разработка
- **[Quick Start](./docs/quick-start.md)** - Установка и запуск
- **Setup Instructions** - Детальная настройка _(создать)_
- **Scripts Guide** - Подробное руководство по скриптам _(создать)_

### 🔍 SEO и Marketing
- **SEO Guide** - SEO оптимизация _(создать)_
- **Content Marketing** - Контент-стратегия _(создать)_

---

## 📋 Справочники

### Команды
```bash
npm run dev              # Запуск разработки
npm run build            # Сборка production
npm run deploy           # Деплой всего
npm run check            # Проверка кода
```

Полный список: **[Commands Reference](./docs/commands.md)**

### Структура проекта
```
weddingtravel/
├── App.tsx                    # Главный компонент
├── components/                # React компоненты
├── locales/                   # Переводы (ru, en, be)
├── contexts/                  # React contexts
├── pages/                     # Страницы приложения
├── supabase/functions/        # Backend Edge Functions
├── docs/                      # 📚 Документация
└── ...
```

---

## 🔗 Быстрые ссылки

### Разработка
- [Quick Start](./docs/quick-start.md)
- [Automation Guide](./docs/automation.md)
- [Commands](./docs/commands.md)

### Мультиязычность
- [I18N Quick Start](./docs/i18n/quickstart.md)
- [I18N Full Guide](./docs/i18n/guide.md)
- Файлы переводов: [/locales/](./locales/)

### Changelog
- [Changelog](./docs/changelog.md) - История всех изменений

### Прочее
- [Project Summary](./docs/project-summary.md) - Сводка проекта
- [Attributions](./docs/attributions.md) - Лицензии и благодарности
- [I18N Demo](./docs/i18n-demo.md) - Демо мультиязычности

---

## 📞 Контакты

**Телефон:** +375 29 580 58 55  
**Email:** hello@weddingtravel.by  
**Instagram:** [@weddingtravel.by](https://instagram.com/weddingtravel.by)

---

## 🛠️ Технологии

- **Frontend:** React + TypeScript + Tailwind CSS v4
- **Backend:** Supabase Edge Functions (Hono)
- **Database:** Supabase PostgreSQL
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **CI/CD:** GitHub Actions

---

## 📊 Статус проекта

**Версия:** 1.6.0  
**Дата:** 21 октября 2025  
**Статус:** ✅ Готов к запуску

### Завершено
- ✅ Полный дизайн и вёрстка
- ✅ Мультиязычность (3 языка)
- ✅ CMS система с админ-панелью
- ✅ SEO оптимизация
- ✅ CI/CD автоматизация
- ✅ 70+ npm скриптов
- ✅ Docker конфигурация

---

## 🎯 Следующие шаги

1. Прочитайте [Quick Start](./docs/quick-start.md)
2. Настройте переменные окружения
3. Запустите `npm run dev`
4. Откройте админ-панель (Ctrl+Shift+A)
5. Начните добавлять контент!

---

**Создано с ❤️ для WeddingTravel**  
© 2025 WeddingTravel. Все права защищены.
