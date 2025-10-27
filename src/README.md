# 💍 WeddingTravel - Свадьба вашей мечты

> Организация свадеб под ключ в Европе, Азии, Беларуси и России

[![CI](https://img.shields.io/badge/CI-passing-brightgreen)]()
[![Deploy](https://img.shields.io/badge/deploy-automated-blue)]()
[![i18n](https://img.shields.io/badge/i18n-3%20languages-success)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)]()

## 🚀 ВАЖНО: Деплой

**⚠️ Сайт ещё не задеплоен!** 

### 👉 ХОТИТЕ ДЕПЛОИТЬ ПРЯМО ИЗ FIGMA?
**[FIGMA_MAKE_EXPLAINED.md](./FIGMA_MAKE_EXPLAINED.md)** 🎨 - Почему нужен хостинг + ВСЕ варианты!

### 👉 САМЫЙ ПРОСТОЙ СПОСОБ (2 минуты, БЕЗ Git!)
**[NETLIFY_DROP_GUIDE.md](./NETLIFY_DROP_GUIDE.md)** 🚀 - Просто перетащите папку!

### 👉 НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?
**[GUIDES_INDEX.md](./GUIDES_INDEX.md)** 📚 - КАКОЙ ГАЙД МНЕ ЧИТАТЬ?

### 👉 НОВИЧОК? Начните здесь:
**[README_FIRST.md](./README_FIRST.md)** 🎯 - ГДЕ ВВОДИТЬ КОМАНДЫ GIT?

### 🟢 Я новичок (первый раз деплою сайт)
- **[NETLIFY_DROP_GUIDE.md](./NETLIFY_DROP_GUIDE.md)** 🥇 - **БЕЗ Git!** Drag & Drop за 2 минуты!
- **[SIMPLE_STEPS.md](./SIMPLE_STEPS.md)** ⭐ - Через GitHub Desktop за 10 минут
- **[HOW_TO_DEPLOY.md](./HOW_TO_DEPLOY.md)** 📖 - Где вводить команды Git

### 🟡 Я знаю Git и терминал
- **[START_HERE.md](./START_HERE.md)** ⚡ - Быстрый старт
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** 📖 - Через терминал
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** ✅ - Чеклист

**Быстрая проверка:**
```bash
npm run deploy:check
```

---

## 🌍 Мультиязычный сайт

Полная поддержка трёх языков:
- 🇷🇺 **Русский** - основной язык
- 🇬🇧 **English** - для международных клиентов
- 🇧🇾 **Беларуская** - для белорусских клиентов

Все компоненты переключаются динамически без перезагрузки!

---

## ⚡ Быстрый старт

```bash
# Установка
npm install

# Запуск разработки
npm run dev

# Сборка для production
npm run build

# Деплой
npm run deploy
```

**Подробнее:** [Quick Start Guide](./docs/quick-start.md)

---

## 📚 Документация

### 📖 Главный индекс
**👉 [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Полный список всей документации

### 🚀 Быстрые ссылки
- [Quick Start](./docs/quick-start.md) - Начало работы
- [I18N Guide](./docs/i18n/guide.md) - Мультиязычность
- [Automation](./docs/automation.md) - 70+ npm скриптов
- [Commands](./docs/commands.md) - Справка команд
- [Changelog](./docs/changelog.md) - История изменений
- [Project Summary](./docs/project-summary.md) - Обзор проекта

---

## 🏗️ Технологии

- **Frontend:** React + TypeScript + Tailwind CSS v4
- **Backend:** Supabase Edge Functions (Hono)
- **Database:** Supabase PostgreSQL + KV Store
- **Storage:** Supabase Storage (изображения)
- **Auth:** Supabase Auth
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **CI/CD:** GitHub Actions

---

## ✨ Основные функции

### Клиентская часть
- ✅ Полностью адаптивный дизайн (mobile-first)
- ✅ Мультиязычность (3 языка с динамическим переключением)
- ✅ Плавные анимации с useInView
- ✅ Калькулятор стоимости свадеб
- ✅ Динамическое портфолио и блог
- ✅ SEO оптимизация + Schema.org
- ✅ Accessibility (WCAG 2.1)

### Административная панель
- ✅ Аутентификация через Supabase Auth
- ✅ Управление портфолио (CRUD)
- ✅ Управление блогом (CRUD)
- ✅ Загрузка изображений в Supabase Storage
- ✅ Защищенный доступ (Ctrl+Shift+A)

### DevOps
- ✅ GitHub Actions CI/CD
- ✅ Автоматический деплой
- ✅ Docker конфигурация
- ✅ 70+ npm скриптов для автоматизации
- ✅ Health checks и мониторинг

---

## 🎨 Дизайн

**Цветовая палитра:**
- Нежная нейтральная палитра: молочный, пудровый, оливковый
- Воздушная и элегантная визуальная концепция

**Тон коммуникации:**
- Эмоциональный и уверенный
- "Мы вместе это сделаем"

---

## 📞 Контакты

- **Телефон:** +375 29 580 58 55
- **Email:** hello@weddingtravel.by
- **Instagram:** [@weddingtravel.by](https://instagram.com/weddingtravel.by)
- **Адрес:** Минск, Беларусь

---

## 🌍 Направления

**Европа:** Италия, Греция, Франция, Испания, Португалия  
**Азия:** Мальдивы, Бали, Таиланд, Шри-Ланка  
**СНГ:** Беларусь (замки, усадьбы), Россия (Подмосковье, Сочи)

---

## 🚀 Автоматизация

Проект включает **70+ npm скриптов** для автоматизации всех задач:

- 15+ команд разработки
- 10+ команд деплоя
- 15+ команд Supabase
- 10+ команд Git
- 20+ утилит

**Подробнее:** [Automation Guide](./docs/automation.md)

---

## 🔒 Безопасность

- Защищенные API маршруты
- JWT токены
- CORS настройки
- Rate limiting
- Валидация данных

---

## 📊 Статус

**Версия:** 1.6.0  
**Дата:** 21 октября 2025  
**Статус:** ✅ Готов к запуску

### Завершённые этапы
- [x] Дизайн и вёрстка
- [x] Мультиязычность (3 языка)
- [x] Backend интеграция
- [x] CMS админ-панель
- [x] SEO оптимизация
- [x] CI/CD автоматизация
- [x] Docker конфигурация
- [x] Документация

---

## 📝 Лицензия

© 2025 WeddingTravel. Все права защищены.

---

## 🙏 Благодарности

- [shadcn/ui](https://ui.shadcn.com/) - UI компоненты
- [Unsplash](https://unsplash.com) - Изображения

---

**Создано с ❤️ для WeddingTravel**

👉 **Начните с [Quick Start Guide](./docs/quick-start.md)**
