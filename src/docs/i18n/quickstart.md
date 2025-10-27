# 🚀 Быстрый старт - Мультиязычность

## ✅ Система уже настроена и работает!

### Доступные языки:
- 🇷🇺 **Русский** - основной язык
- 🇬🇧 **English** - для иностранных клиентов  
- 🇧🇾 **Беларуская** - для белорусских клиентов

Все компоненты сайта полностью переведены на три языка!

---

## 🎯 Как перевести компонент за 3 шага

### Шаг 1: Импорт
```tsx
import { useTranslation } from "../contexts/LanguageContext";
```

### Шаг 2: Получить функцию перевода
```tsx
export function MyComponent() {
  const { t } = useTranslation();
  
  return <h2>{t('section.title')}</h2>;
}
```

### Шаг 3: Готово! 
Компонент автоматически переключится при смене языка.

---

## 📝 Примеры использования

### Простой текст
```tsx
<h1>{t('hero.title')}</h1>
```

### В атрибутах
```tsx
<button aria-label={t('button.label')}>
  {t('button.text')}
</button>
```

### Массивы и списки
```tsx
{t('services.list').map((service, index) => (
  <div key={index}>{service.title}</div>
))}
```

---

## 🔍 Где найти ключи для перевода?

Все переводы в папке `/locales/`:
- `/locales/ru.ts` - русские переводы
- `/locales/en.ts` - английские переводы
- `/locales/be.ts` - беларуские переводы

Структура:
```ts
export const ru = {
  header: { ... },
  hero: { ... },
  advantages: { ... },
  about: { ... },
  services: { ... },
  portfolio: { ... },
  blog: { ... },
  calculator: { ... },
  contact: { ... },
  footer: { ... }
}
```

---

## 🎨 Переключатель языка

Уже добавлен в Header! Пользователь может переключать язык одним кликом.

### Как работает:
1. Выбор языка сохраняется в `localStorage`
2. Язык автоопределяется по браузеру при первом визите
3. HTML атрибут `lang` обновляется автоматически (важно для SEO)

---

## 🐛 Отладка

### Debug панель (временная, удалить в production):
```tsx
import { LanguageDebug } from './components/LanguageDebug';

// В App.tsx (уже добавлена)
<LanguageDebug />
```

### Проверка текущего языка:
```tsx
const { language } = useTranslation();
console.log('Current language:', language);
```

---

## ✅ Что уже полностью переведено:

- ✅ Header (навигация)
- ✅ Hero (главный экран)
- ✅ Advantages (преимущества)
- ✅ About (о компании)
- ✅ Services (услуги)
- ✅ Portfolio (портфолио)
- ✅ Blog (блог + fallback посты)
- ✅ Calculator (калькулятор стоимости)
- ✅ Contact (контакты)
- ✅ Footer (подвал)
- ✅ Модальные окна и формы
- ✅ SEO мета-теги

---

## 📚 Подробнее

Для более детальной информации смотрите:
- [guide.md](./guide.md) - Полное руководство по мультиязычности
- [/locales/index.ts](../../locales/index.ts) - Типы и экспорты

---

**Последнее обновление**: 21 октября 2025
