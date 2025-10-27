# 🚀 ДЕПЛОЙ САЙТА ПРЯМО СЕЙЧАС

## ⚠️ ВАЖНО: Сайт ещё не задеплоен!

Ошибка `404: DEPLOYMENT_NOT_FOUND` означает, что проект не загружен на Vercel.

---

## ✅ РЕШЕНИЕ: Деплой за 10 минут

### Способ 1: Через Vercel Dashboard (самый простой!) ⭐

#### Шаг 1: Загрузите код на GitHub

Если ещё не сделали:

```bash
# Инициализируйте git (если ещё не сделали)
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на GitHub
# Перейдите на https://github.com/new
# Название: weddingtravel

# Загрузите код
git remote add origin https://github.com/ваш-username/weddingtravel.git
git branch -M main
git push -u origin main
```

#### Шаг 2: Импортируйте в Vercel

1. Откройте **https://vercel.com/new**
2. Нажмите **Import Git Repository**
3. Найдите репозиторий **weddingtravel**
4. Нажмите **Import**

#### Шаг 3: Настройте проект

**Build Settings:**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
```

#### Шаг 4: Добавьте переменные окружения

Нажмите **Environment Variables** и добавьте:

```
VITE_SUPABASE_URL = https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY = ваш-anon-key
```

**Где взять эти данные?**
- Откройте https://supabase.com/dashboard
- Выберите ваш проект
- Settings → API
- Скопируйте URL и anon key

#### Шаг 5: Деплой!

Нажмите **Deploy**

⏱️ Подождите 2-3 минуты...

✅ **Готово!** Ваш сайт будет доступен по адресу:
```
https://weddingtravel-ваш-username.vercel.app
```

---

### Способ 2: Через Vercel CLI (для продвинутых)

#### Шаг 1: Установите Vercel CLI

```bash
npm install -g vercel
```

#### Шаг 2: Войдите

```bash
vercel login
```

Выберите **Continue with GitHub** или **Continue with Email**

#### Шаг 3: Деплой

```bash
# Перейдите в папку проекта
cd путь/к/weddingtravel

# Первый деплой
vercel

# Следуйте инструкциям:
# Set up and deploy? → Yes
# Which scope? → Ваш аккаунт
# Link to existing project? → No
# Project name? → weddingtravel
# In which directory? → ./
# Override settings? → No
```

#### Шаг 4: Production деплой

```bash
vercel --prod
```

#### Шаг 5: Добавьте переменные окружения

```bash
vercel env add VITE_SUPABASE_URL production
# Введите значение: https://ваш-проект.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Введите ваш anon key
```

#### Шаг 6: Редеплой с переменными

```bash
vercel --prod
```

✅ **Готово!**

---

## 📊 Проверка деплоя

### После деплоя откройте:

```
https://ваш-проект.vercel.app
```

### Должны видеть:
- ✅ Главная страница WeddingTravel
- ✅ Hero секция с фото
- ✅ Все секции загружаются
- ✅ Переключатель языков работает

### Если что-то не работает:

**Проверка 1: Build прошёл успешно?**
```bash
# Локально
npm run build
```

Если есть ошибки - исправьте их перед деплоем.

**Проверка 2: Environment Variables добавлены?**

Vercel Dashboard → Settings → Environment Variables

Должны быть:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Проверка 3: Смотрите логи**

Vercel Dashboard → Deployments → Latest → Build Logs

---

## 🌐 Добавление домена weddingtravel.by

**После успешного деплоя:**

1. **Vercel Dashboard → Settings → Domains**
2. **Add Domain**: `weddingtravel.by`
3. **Add Domain**: `www.weddingtravel.by`
4. Следуйте инструкциям для настройки DNS

**Подробнее:** [domain-setup.md](./docs/deployment/domain-setup.md)

---

## 🆘 Частые проблемы

### Проблема: "Build failed"

**Решение:**
```bash
# Удалите node_modules и пересоберите
rm -rf node_modules package-lock.json
npm install
npm run build
```

Если работает локально, значит проблема в Vercel настройках.

### Проблема: "Environment variables not found"

**Решение:**
1. Добавьте переменные в Vercel Dashboard
2. Переменные должны начинаться с `VITE_`
3. Сделайте **Redeploy** после добавления переменных

### Проблема: "404 on routes"

**Решение:**
Файл `vercel.json` уже настроен в проекте! ✅

Проверьте что он содержит:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📋 Чек-лист деплоя

- [ ] Код загружен на GitHub
- [ ] Создан проект на Vercel
- [ ] Build Settings настроены
- [ ] Environment Variables добавлены
- [ ] Первый деплой успешен
- [ ] Сайт открывается по URL
- [ ] Все секции работают
- [ ] Языки переключаются
- [ ] (Опционально) Домен настроен

---

## 💡 После деплоя

### Автоматический деплой

После подключения GitHub, каждый `git push` будет автоматически деплоить сайт! 🚀

### Полезные команды

```bash
# Посмотреть все деплои
vercel ls

# Посмотреть логи
vercel logs

# Откатить на предыдущую версию
vercel rollback

# Информация о проекте
vercel inspect
```

---

## 🎯 Быстрый старт (TL;DR)

**Если GitHub уже настроен:**

1. Откройте https://vercel.com/new
2. Import Git Repository → Выберите weddingtravel
3. Добавьте Environment Variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Deploy
5. Готово! ✅

**Если нет GitHub:**

```bash
npm install -g vercel
vercel login
vercel
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel --prod
```

---

**Время выполнения:** 10 минут ⏱️  
**Сложность:** Легко ⭐  
**Стоимость:** Бесплатно (Vercel Hobby Plan) 💰

**Обновлено:** 23 октября 2025

🚀 **Удачи с деплоем!**
