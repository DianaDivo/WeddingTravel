# ⚡ ДЕПЛОЙ ЗА 3 ШАГА

## 🎯 Самый простой способ (без терминала!)

### ШАГ 1: Загрузите код на GitHub

#### 1.1. Установите GitHub Desktop
📥 Скачайте: https://desktop.github.com/

#### 1.2. Войдите в GitHub
- Откройте GitHub Desktop
- File → Options → Sign in
- Введите данные GitHub аккаунта

#### 1.3. Добавьте проект
- File → Add Local Repository
- Выберите папку **weddingtravel**
- Нажмите **Add Repository**

**Если ошибка "not a Git repository":**
- Нажмите **Create a repository instead**
- Заполните:
  - Name: `weddingtravel`
  - Description: `Современный сайт WeddingTravel`
- Нажмите **Create Repository**

#### 1.4. Сделайте первый коммит
- GitHub Desktop покажет все файлы
- Внизу слева введите:
  - Summary: `Initial commit`
  - Description: `Первая версия сайта WeddingTravel`
- Нажмите **Commit to main**

#### 1.5. Опубликуйте на GitHub
- Нажмите **Publish repository**
- Снимите галочку **Keep this code private** (или оставьте если хотите приватный)
- Нажмите **Publish repository**

✅ **Готово! Код на GitHub!**

**Проверка:** Откройте https://github.com/YOUR-USERNAME/weddingtravel

---

### ШАГ 2: Деплой на Vercel (через браузер)

#### 2.1. Зарегистрируйтесь на Vercel
- Откройте: https://vercel.com/signup
- Нажмите **Continue with GitHub**
- Авторизуйтесь

#### 2.2. Импортируйте проект
- Откройте: https://vercel.com/new
- Нажмите **Import Git Repository**
- Найдите **weddingtravel**
- Нажмите **Import**

#### 2.3. Настройте проект

**Оставьте как есть:**
- Framework Preset: **Vite** ✅
- Build Command: **npm run build** ✅
- Output Directory: **dist** ✅

**Добавьте Environment Variables:**

Нажмите **Environment Variables** и добавьте:

**Переменная 1:**
```
Name: VITE_SUPABASE_URL
Value: https://ваш-проект.supabase.co
```

**Переменная 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: ваш-ключ-от-supabase
```

**📍 Где взять эти данные?**

1. Откройте: https://supabase.com/dashboard
2. Выберите ваш проект (или создайте новый)
3. Settings → API
4. Скопируйте:
   - **Project URL** → вставьте в VITE_SUPABASE_URL
   - **anon public** (в Project API keys) → вставьте в VITE_SUPABASE_ANON_KEY

#### 2.4. Деплой!
- Нажмите **Deploy**
- ⏱️ Подождите 2-3 минуты...

✅ **Готово! Сайт работает!**

**Ваш URL:**
```
https://weddingtravel-ваш-username.vercel.app
```

**Откройте и проверьте!** 🎉

---

### ШАГ 3: Настройте домен (опционально)

#### 3.1. Добавьте домен в Vercel
- Vercel Dashboard → Ваш проект
- Settings → Domains
- Add Domain
- Введите: `weddingtravel.by` → Add
- Введите: `www.weddingtravel.by` → Add

Vercel покажет что нужно сделать дальше.

#### 3.2. Настройте DNS

**Где вы купили домен?**
- hoster.by
- domains.by
- tut.by
- другой

**Войдите в панель управления доменом**

**Найдите раздел "DNS" или "DNS-записи"**

**Добавьте 2 записи:**

**Запись 1:**
```
Тип: A
Имя: @ (или оставьте пустым, или weddingtravel.by)
Значение: 76.76.21.21
TTL: 3600 (или Auto)
```

**Запись 2:**
```
Тип: CNAME
Имя: www
Значение: cname.vercel-dns.com
TTL: 3600 (или Auto)
```

**Сохраните**

⏱️ **Подождите 15-30 минут**

**Проверьте:**
- Откройте: https://dnschecker.org
- Введите: `weddingtravel.by`
- Должно показать IP: **76.76.21.21** по всему миру

**Откройте:** https://weddingtravel.by

✅ **Сайт работает на вашем домене!** 🎊

---

## 📊 Итого: Сколько времени?

| Шаг | Время |
|-----|-------|
| 1. GitHub Desktop + загрузка кода | 5 минут |
| 2. Деплой на Vercel | 5 минут |
| 3. Настройка домена | 5 минут + ожидание DNS (30 мин) |
| **ИТОГО (без домена)** | **10 минут** ✅ |
| **ИТОГО (с доменом)** | **40 минут** ✅ |

---

## 🎓 Ещё проще: Только Vercel

Можно **БЕЗ GitHub Desktop**, прямо из папки:

### 1. Установите Vercel CLI
- Откройте терминал (см. [HOW_TO_DEPLOY.md](./HOW_TO_DEPLOY.md))
- Введите: `npm install -g vercel`

### 2. Войдите
```bash
vercel login
```
Выберите **Continue with GitHub**

### 3. Деплой
```bash
vercel
```
Ответьте на вопросы (всё оставьте по умолчанию)

### 4. Environment Variables
```bash
vercel env add VITE_SUPABASE_URL production
# Введите значение

vercel env add VITE_SUPABASE_ANON_KEY production
# Введите значение
```

### 5. Production
```bash
vercel --prod
```

✅ **Готово за 5 минут!**

---

## 🆘 Частые вопросы

### ❓ У меня нет аккаунта GitHub
**Ответ:** Создайте на https://github.com/signup - это бесплатно!

### ❓ У меня нет проекта на Supabase
**Ответ:** 
1. Откройте https://supabase.com
2. Sign up (можно через GitHub)
3. Create new project
4. Выберите бесплатный план
5. Скопируйте URL и API key

### ❓ Vercel просит оплату?
**Ответ:** Нет! Vercel **БЕСПЛАТНЫЙ** для личных проектов (Hobby Plan)

### ❓ Как обновить сайт после деплоя?
**Ответ:**

**Через GitHub Desktop:**
1. Измените файлы
2. Commit to main
3. Push origin

**Через терминал:**
```bash
git add .
git commit -m "Обновление"
git push
```

Vercel автоматически задеплоит новую версию! ✅

### ❓ Сайт не открывается
**Ответ:**
1. Проверьте Build Logs в Vercel
2. Убедитесь что Environment Variables добавлены
3. Проверьте что `npm run build` работает локально

---

## 📚 Дополнительные гайды

Если нужно больше деталей:

- **[HOW_TO_DEPLOY.md](./HOW_TO_DEPLOY.md)** - Где вводить команды
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Подробная инструкция
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Чеклист
- **[domain-setup.md](./docs/deployment/domain-setup.md)** - Настройка домена

---

## 🎯 Рекомендация

**Для начала:**
1. Используйте **GitHub Desktop** (проще всего!)
2. Деплойте на **Vercel через браузер**
3. Получите временный URL: `weddingtravel-xxx.vercel.app`
4. **Проверьте что всё работает**
5. **Потом** настройте домен weddingtravel.by

Не торопитесь с доменом - сначала убедитесь что сайт работает! ✅

---

**Создано:** 23 октября 2025

🚀 **Начните прямо сейчас!** 🚀
