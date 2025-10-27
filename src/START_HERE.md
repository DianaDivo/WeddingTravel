# 🎯 НАЧНИТЕ ЗДЕСЬ

## ⚠️ ТЕКУЩАЯ СИТУАЦИЯ

Ваш сайт **НЕ ЗАДЕПЛОЕН** на Vercel.

Ошибка `404: DEPLOYMENT_NOT_FOUND` = проект не загружен.

---

## ✅ ЧТО ДЕЛАТЬ ПРЯМО СЕЙЧАС

### Вариант 1: Быстрый деплой через браузер (5 минут)

1. **Откройте:** https://vercel.com/new
2. **Import Git Repository** → выберите ваш GitHub репозиторий
3. **Deploy**

**Нет GitHub репозитория?** Сначала создайте его:
```bash
git init
git add .
git commit -m "Initial commit"
# Создайте репозиторий на github.com/new
git remote add origin https://github.com/USERNAME/weddingtravel.git
git push -u origin main
```

---

### Вариант 2: Деплой через CLI (10 минут)

```bash
# 1. Установите Vercel CLI
npm install -g vercel

# 2. Войдите
vercel login

# 3. Деплой
vercel

# 4. Production
vercel --prod
```

---

## 🔑 Переменные окружения (ВАЖНО!)

После деплоя добавьте в Vercel:

```
VITE_SUPABASE_URL = https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...ваш-ключ
```

**Где взять:**
- https://supabase.com/dashboard
- Ваш проект → Settings → API

---

## 📚 Подробные инструкции

**Выберите свой уровень:**

### 🟢 Для новичков (никогда не работали с Git)
- **[SIMPLE_STEPS.md](./SIMPLE_STEPS.md)** ⭐ - Деплой БЕЗ терминала за 10 минут!
- **[HOW_TO_DEPLOY.md](./HOW_TO_DEPLOY.md)** 📖 - Где вводить команды + скриншоты

### 🟡 Для опытных (знаете Git и терминал)
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** 📖 - Полная инструкция через терминал
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** ✅ - Чеклист

### 🔧 Решение проблем
- **[QUICK_FIX_DOMAIN.md](./QUICK_FIX_DOMAIN.md)** - DNS проблемы
- **[domain-setup.md](./docs/deployment/domain-setup.md)** - Настройка weddingtravel.by

---

## 🎯 Результат

После деплоя сайт будет доступен:
```
https://weddingtravel-username.vercel.app
```

Затем можно настроить домен:
```
https://weddingtravel.by
```

---

## 📋 Порядок действий

1. ✅ **Удалить старые workflows** - ГОТОВО! ✓
2. ⏳ **Задеплоить на Vercel** - ДЕЛАЙТЕ СЕЙЧАС!
3. ⏳ **Добавить переменные окружения**
4. ⏳ **Настроить домен** (опционально)

---

## 🆘 Нужна помощь?

**Читайте:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)

**Смотрите логи:**
- Vercel Dashboard → Deployments → Build Logs

**Проверьте локально:**
```bash
npm run build
```

---

**Создано:** 23 октября 2025  
**Статус:** Готово к деплою! 🚀
