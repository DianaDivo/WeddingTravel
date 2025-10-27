# 🌍 Руководство по мультиязычности WeddingTravel

Полное руководство по системе мультиязычности (i18n) проекта.

---

## ✅ Обзор

Сайт WeddingTravel полностью мультиязычный с поддержкой трёх языков:

- 🇷🇺 **Русский (ru)** - основной язык, используется по умолчанию
- 🇬🇧 **English (en)** - для международных клиентов
- 🇧🇾 **Беларуская (be)** - для белорусских клиентов

Все компоненты полностью переведены и переключаются динамически без перезагрузки страницы.

---

## 🏗️ Архитектура

### 1. Language Context (`/contexts/LanguageContext.tsx`)

React контекст для управления текущим языком:

```tsx
import { useTranslation } from '../contexts/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();
  
  return <h1>{t('hero.title')}</h1>;
}
```

**API:**
- `t(key)` - функция перевода
- `language` - текущий язык ('ru' | 'en' | 'be')
- `setLanguage(lang)` - изменить язык

### 2. Словари переводов (`/locales/`)

Все переводы хранятся в TypeScript файлах:

```
/locales
├── index.ts     # Экспорты и типы
├── ru.ts        # Русские переводы
├── en.ts        # Английские переводы
└── be.ts        # Беларуские переводы
```

**Структура переводов:**

```ts
export const ru = {
  header: {
    home: "Главная",
    services: "Услуги",
    portfolio: "Портфолио",
    // ...
  },
  hero: {
    title: "Ваша история любви...",
    subtitle: "Организуем свадьбы...",
    // ...
  },
  // ... остальные секции
};
```

### 3. Language Switcher (`/components/LanguageSwitcher.tsx`)

Компонент переключения языка с флагами:

```tsx
<LanguageSwitcher />
```

Автоматически интегрирован в Header.

---

## 📝 Использование

### Базовое использование

```tsx
import { useTranslation } from "../contexts/LanguageContext";

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('about.title')}</h2>
      <p>{t('about.description')}</p>
    </div>
  );
}
```

### Вложенные ключи

```tsx
// Доступ к вложенным объектам
<h3>{t('services.abroad.title')}</h3>
<p>{t('services.abroad.description')}</p>
```

### Массивы

```tsx
// Перевод массивов (например, список услуг)
const { t } = useTranslation();
const services = t('services.list'); // возвращает массив

services.map((service, index) => (
  <div key={index}>
    <h4>{service.title}</h4>
    <p>{service.description}</p>
  </div>
))
```

### В атрибутах

```tsx
<button aria-label={t('calculator.button.label')}>
  {t('calculator.button.text')}
</button>

<img alt={t('portfolio.imageAlt')} src="..." />
```

---

## 🎨 Добавление нового перевода

### Шаг 1: Добавить ключи в словари

**`/locales/ru.ts`:**
```ts
export const ru = {
  // ... существующие переводы
  newSection: {
    title: "Новая секция",
    description: "Описание новой секции"
  }
};
```

**`/locales/en.ts`:**
```ts
export const en = {
  // ... существующие переводы
  newSection: {
    title: "New Section",
    description: "Description of new section"
  }
};
```

**`/locales/be.ts`:**
```ts
export const be = {
  // ... существующие переводы
  newSection: {
    title: "Новая секцыя",
    description: "Апісанне новай секцыі"
  }
};
```

### Шаг 2: Использовать в компоненте

```tsx
import { useTranslation } from "../contexts/LanguageContext";

export function NewSection() {
  const { t } = useTranslation();
  
  return (
    <section>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </section>
  );
}
```

---

## 🔍 Все переведённые секции

### ✅ Header
- Навигационное меню
- Кнопка "Рассчитать стоимость"

### ✅ Hero
- Главный заголовок
- Подзаголовок
- Кнопки CTA

### ✅ Advantages
- Заголовок секции
- 4 преимущества (заголовки и описания)

### ✅ About
- О компании
- Миссия
- Ценности

### ✅ Services
- Все услуги с описаниями
- Категории: заграница, Беларусь

### ✅ Portfolio
- Заголовки
- Описания проектов
- Категории

### ✅ Blog
- Заголовки
- Fallback посты
- Категории и теги

### ✅ Calculator
- Все поля формы
- Опции выбора
- Кнопки

### ✅ Contact
- Контактная информация
- Форма обратной связи

### ✅ Footer
- Навигация
- Социальные сети
- Копирайт

### ✅ Модальные окна
- BookingModal
- Все формы

---

## 🌐 SEO и мультиязычность

### HTML lang attribute

Автоматически обновляется при смене языка:

```html
<html lang="ru">  <!-- или 'en', 'be' -->
```

### Meta теги

Обновите компонент SEO для поддержки мультиязычности:

```tsx
<SEO
  title={t('seo.title')}
  description={t('seo.description')}
  keywords={t('seo.keywords')}
/>
```

---

## 💾 Persistence

### LocalStorage

Выбранный язык сохраняется:

```ts
localStorage.setItem('weddingtravel-language', 'en');
```

### Автоопределение

При первом визите язык определяется по браузеру:

```ts
const browserLang = navigator.language.slice(0, 2); // 'en', 'ru', 'be'
```

---

## 🐛 Отладка

### Debug компонент

Используйте `LanguageDebug` для отладки:

```tsx
import { LanguageDebug } from './components/LanguageDebug';

// Показывает:
// - Текущий язык
// - Кнопки переключения
// - Тестовые переводы
<LanguageDebug />
```

**Важно:** Удалите перед деплоем в production!

### Console логи

```tsx
const { t, language } = useTranslation();

console.log('Current language:', language);
console.log('Translation:', t('hero.title'));
```

---

## 🚨 Частые проблемы

### Проблема: Переводы не переключаются

**Решение:**
1. Проверьте что компонент обёрнут в `LanguageProvider`
2. Проверьте что используете хук `useTranslation()`
3. Проверьте консоль на ошибки

### Проблема: Отсутствует перевод

**Решение:**
- Убедитесь что ключ есть во всех файлах локализации (ru, en, be)
- Проверьте путь к ключу (например, `hero.title` а не `header.title`)

### Проблема: Ошибка "Cannot read property of undefined"

**Решение:**
- Проверьте структуру объекта перевода
- Добавьте fallback: `t('key') || 'Default text'`

---

## 📋 Чек-лист для новых компонентов

При создании нового компонента:

- [ ] Импортировать `useTranslation`
- [ ] Добавить ключи в `/locales/ru.ts`
- [ ] Добавить ключи в `/locales/en.ts`
- [ ] Добавить ключи в `/locales/be.ts`
- [ ] Заменить hardcoded текст на `t('key')`
- [ ] Протестировать на всех трёх языках
- [ ] Проверить длину текста на разных языках (адаптивность)

---

## 🔮 Расширение системы

### Добавление нового языка

1. Создайте файл `/locales/pl.ts` (например, для польского)
2. Скопируйте структуру из `/locales/ru.ts`
3. Переведите все ключи
4. Обновите `/locales/index.ts`:
   ```ts
   export const translations = { ru, en, be, pl };
   export type Language = 'ru' | 'en' | 'be' | 'pl';
   ```
5. Добавьте в `LanguageSwitcher.tsx`

---

## 📚 Дополнительные ресурсы

- [quickstart.md](./quickstart.md) - Быстрый старт
- [/contexts/LanguageContext.tsx](../../contexts/LanguageContext.tsx) - Исходный код
- [/locales/](../../locales/) - Все переводы

---

**Последнее обновление**: 21 октября 2025  
**Статус**: ✅ Все компоненты переведены на 3 языка
