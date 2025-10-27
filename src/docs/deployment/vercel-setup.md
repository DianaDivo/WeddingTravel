# 🚀 Быстрый деплой на Vercel

## ⚡ Деплой за 5 минут

### Шаг 1: Подготовка

```bash
# Убедитесь что проект собирается локально
npm run build

# Убедитесь что у вас есть аккаунт на Vercel
# https://vercel.com/signup
```

### Шаг 2: Установите Vercel CLI

```bash
npm install -g vercel
```

### Шаг 3: Войдите в Vercel

```bash
vercel login
```

### Шаг 4: Деплой!

```bash
# Первый деплой (интерактивный)
vercel

# Следуйте инструкциям:
# - Set up and deploy? Yes
# - Which scope? Выберите ваш аккаунт
# - Link to existing project? No
# - Project name? weddingtravel (или другое имя)
# - Directory? ./
# - Override settings? No
```

### Шаг 5: Production деплой

```bash
vercel --prod
```

**Готово! 🎉** Ваш сайт доступен по адресу: `https://weddingtravel.vercel.app`

---

## 🔧 Настройка переменных окружения

### В Vercel Dashboard:

1. Откройте **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Выберите проект **weddingtravel**
3. **Settings → Environment Variables**
4. Добавьте переменные:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Или через CLI:

```bash
vercel env add VITE_SUPABASE_URL production
# Введите значение когда попросит

vercel env add VITE_SUPABASE_ANON_KEY production
# Введите значение когда попросит
```

---

## 🌐 Добавление домена

### Через Dashboard:

1. **Vercel Dashboard → Your Project**
2. **Settings → Domains**
3. Нажмите **Add**
4. Введите: `weddingtravel.by` и `www.weddingtravel.by`
5. Следуйте инструкциям по настройке DNS

**Подробнее:** [domain-setup.md](./domain-setup.md)

---

## 🤖 Автоматический деплой через GitHub

### Шаг 1: Подключите GitHub

1. **Vercel Dashboard → Import Project**
2. **Import Git Repository**
3. Выберите репозиторий **weddingtravel**
4. **Import**

### Шаг 2: Настройте

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Готово!

Теперь каждый `git push` в main автоматически деплоит сайт! 🚀

---

## 📊 Полезные команды

```bash
# Посмотреть все деплои
vercel ls

# Посмотреть логи
vercel logs

# Откатить на предыдущую версию
vercel rollback

# Посмотреть информацию о проекте
vercel inspect

# Удалить деплой
vercel remove <deployment-url>
```

---

## 🐛 Решение проблем

### Проблема: Build fails

```bash
# Проверьте локально
npm run build

# Проверьте логи
vercel logs
```

### Проблема: Environment variables не работают

1. Убедитесь что добавили их для **production**
2. Переменные должны начинаться с `VITE_`
3. Сделайте redeploy после добавления переменных

### Проблема: 404 на страницах

Добавьте `vercel.json` (уже есть в проекте):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 💰 Стоимость

- **Hobby plan** - БЕСПЛАТНО ✅
  - Unlimited deployments
  - Automatic HTTPS
  - 100 GB bandwidth/month
  - Идеально для WeddingTravel!

- **Pro plan** - $20/month (если нужно больше)

---

## ✅ Чек-лист

- [ ] Vercel CLI установлен
- [ ] Залогинен в Vercel
- [ ] Проект задеплоен
- [ ] Environment variables добавлены
- [ ] Домен настроен (опционально)
- [ ] GitHub подключен для auto-deploy
- [ ] HTTPS работает ✅

---

**Ссылки:**
- [Vercel Documentation](https://vercel.com/docs)
- [Custom Domains](./domain-setup.md)

**Создано:** 23 октября 2025
