# ⚡ Быстрый старт WeddingTravel

## 🎯 Для нетехнических пользователей

### Доступ к админ-панели
1. Откройте сайт в браузере
2. Нажмите `Ctrl + Shift + A` (Windows) или `Cmd + Shift + A` (Mac)
3. Появится кнопка с шестеренкой ⚙️ в правом нижнем углу
4. Нажмите на неё и войдите

### Добавление проекта в портфолио
1. Войдите в админ-панель
2. Вкладка "Портфолио"
3. Кнопка "Добавить проект"
4. Заполните форму и загрузите фото
5. Сохранить

### Добавление поста в блог
1. Войдите в админ-панель
2. Вкладка "Блог"
3. Кнопка "Создать пост"
4. Заполните форму (поддерживается Markdown)
5. Опубликовать

---

## 💻 Для разработчиков

### Установка и запуск

```bash
# 1. Установка зависимостей
npm install

# 2. Создание .env.local файла
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# 3. Запуск dev сервера
npm run dev
```

### Основные команды

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка для production
npm run preview      # Предпросмотр production сборки

# Проверка кода
npm run check        # Быстрая проверка (type + lint)
npm run validate     # Полная валидация

# Деплой
npm run deploy              # Полный деплой
npm run deploy:frontend     # Только frontend
npm run deploy:supabase     # Только backend
npm run health-check        # Проверка работы
```

### 🚀 Автоматический деплой

Проект настроен с **GitHub Actions**:

1. Создайте репозиторий на GitHub
2. Добавьте secrets в Settings → Secrets
3. Push в main → автоматический деплой!

📖 Подробнее: [ci-cd.md](./deployment/ci-cd.md)

---

## 🎨 Дизайн-система

### Цвета

```css
bg-stone-50     /* Светлый фон */
bg-stone-800    /* Темные элементы */
text-stone-600  /* Текст */
text-rose-300   /* Нежный розовый */
```

### Типографика

```tsx
<h1>  // text-4xl lg:text-6xl
<h2>  // text-3xl lg:text-4xl
<p>   // text-base или text-lg
```

---

## 📝 Изменение контента

### Мультиязычность

Сайт поддерживает 3 языка: 🇷🇺 Русский, 🇬🇧 English, 🇧🇾 Беларуская

**Редактирование переводов:** `/locales/ru.ts`, `/locales/en.ts`, `/locales/be.ts`

### Обновить телефон

- `/components/Contact.tsx`
- `/components/Footer.tsx`

### Обновить email

Везде используется: `hello@weddingtravel.by`

### Обновить Instagram

Уже настроено: `@weddingtravel.by`

---

## ✅ Чек-лист запуска

### До запуска
- [ ] Обновлены контактные данные
- [ ] Создан администратор в Supabase
- [ ] Загружены реальные фото портфолио
- [ ] Написаны первые статьи блога
- [ ] Протестированы все формы

### После запуска
- [ ] Настроен Google Search Console
- [ ] Настроен Google Analytics
- [ ] Созданы социальные сети
- [ ] Настроен мониторинг

---

## 📚 Полезные ссылки

- [automation.md](./automation.md) - 70+ npm скриптов
- [seo.md](./seo.md) - SEO оптимизация
- [i18n/guide.md](./i18n/guide.md) - Мультиязычность
- [deployment/ci-cd.md](./deployment/ci-cd.md) - CI/CD

---

**Создано с ❤️ для WeddingTravel**
