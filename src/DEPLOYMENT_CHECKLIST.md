# ✅ Чеклист деплоя WeddingTravel

## 📋 Перед деплоем

### 1. Локальная проверка

- [ ] `npm install` выполнен успешно
- [ ] `npm run build` работает без ошибок
- [ ] `npm run dev` запускает сайт локально
- [ ] Все секции отображаются корректно
- [ ] Переключение языков работает
- [ ] Нет ошибок в консоли браузера

**Команда для проверки:**
```bash
npm run deploy:check
```

---

### 2. Git репозиторий

- [ ] `git init` выполнен
- [ ] Все файлы добавлены: `git add .`
- [ ] Сделан коммит: `git commit -m "Initial commit"`
- [ ] Создан репозиторий на GitHub
- [ ] Remote добавлен: `git remote add origin <URL>`
- [ ] Код загружен: `git push -u origin main`

**Быстрая настройка:**
```bash
git init
git add .
git commit -m "Initial commit: WeddingTravel website"
# Создайте репозиторий на github.com/new
git remote add origin https://github.com/USERNAME/weddingtravel.git
git push -u origin main
```

---

### 3. Supabase переменные

- [ ] Supabase проект создан
- [ ] VITE_SUPABASE_URL получен
- [ ] VITE_SUPABASE_ANON_KEY получен
- [ ] Edge функция задеплоена (если используется)

**Где взять:**
1. https://supabase.com/dashboard
2. Выберите проект
3. Settings → API
4. Скопируйте URL и anon key

---

## 🚀 Деплой на Vercel

### Способ 1: Dashboard (рекомендуется)

- [ ] Открыт https://vercel.com/new
- [ ] Нажато "Import Git Repository"
- [ ] Выбран репозиторий weddingtravel
- [ ] Framework Preset: **Vite**
- [ ] Build Command: **npm run build**
- [ ] Output Directory: **dist**
- [ ] Root Directory: **./**

**Environment Variables добавлены:**
- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`

- [ ] Нажато "Deploy"
- [ ] Деплой успешен (проверьте Build Logs)

---

### Способ 2: CLI

- [ ] `npm install -g vercel` выполнен
- [ ] `vercel login` выполнен
- [ ] `vercel` выполнен (следовал подсказкам)
- [ ] `vercel env add VITE_SUPABASE_URL production`
- [ ] `vercel env add VITE_SUPABASE_ANON_KEY production`
- [ ] `vercel --prod` выполнен
- [ ] Деплой успешен

---

## 🔍 Проверка после деплоя

### Базовая функциональность

- [ ] Сайт открывается по URL
- [ ] Главная страница загружается
- [ ] Hero секция видна
- [ ] Изображения загружаются
- [ ] Навигация работает
- [ ] Footer отображается

### Функции

- [ ] Переключатель языков работает (RU/EN/BE)
- [ ] Все секции на главной отображаются:
  - [ ] Hero
  - [ ] About
  - [ ] Services
  - [ ] Portfolio
  - [ ] Calculator
  - [ ] Contact
  - [ ] Footer

- [ ] Страницы работают:
  - [ ] /about
  - [ ] /services
  - [ ] /portfolio
  - [ ] /blog
  - [ ] /contact
  - [ ] /calculator

- [ ] Модальные окна открываются
- [ ] Формы отправляются (если настроены)

### SEO

- [ ] Title теги корректны
- [ ] Meta description присутствует
- [ ] Open Graph теги настроены
- [ ] Schema.org разметка работает
- [ ] robots.txt доступен
- [ ] sitemap.xml доступен (если есть)

### Performance

- [ ] Lighthouse Score:
  - [ ] Performance > 80
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

**Проверка:**
1. Откройте DevTools (F12)
2. Lighthouse
3. Generate report

---

## 🌐 Настройка домена (опционально)

### У регистратора домена

- [ ] Вход в панель управления (hoster.by / domains.by / tut.by)
- [ ] Раздел DNS открыт
- [ ] A запись добавлена:
  - Тип: **A**
  - Имя: **@**
  - Значение: **76.76.21.21**
  - TTL: **3600**

- [ ] CNAME запись добавлена:
  - Тип: **CNAME**
  - Имя: **www**
  - Значение: **cname.vercel-dns.com**
  - TTL: **3600**

### В Vercel

- [ ] Settings → Domains открыто
- [ ] Добавлен домен: `weddingtravel.by`
- [ ] Добавлен домен: `www.weddingtravel.by`
- [ ] Статус: "Valid Configuration"
- [ ] SSL сертификат выпущен (автоматически)

### Проверка DNS

- [ ] Проверено на https://dnschecker.org
- [ ] DNS записи видны глобально
- [ ] Сайт открывается по домену
- [ ] Редирект www → non-www работает (или наоборот)
- [ ] HTTPS работает

⏱️ **Время ожидания:** 15 минут - 48 часов (обычно 30 минут)

---

## 🤖 Автоматизация

### GitHub Actions

- [ ] Файлы workflows существуют в `.github/workflows/`
- [ ] CI pipeline настроен
- [ ] Deploy workflow настроен
- [ ] Preview deployments работают для PR

### Vercel Integration

- [ ] GitHub App установлен
- [ ] Auto-deploy при push включён
- [ ] Preview deployments при PR включены
- [ ] Build & Deployment настройки корректны

---

## 📊 Мониторинг

### Vercel Analytics

- [ ] Analytics включён в проекте
- [ ] Посещения отслеживаются
- [ ] Performance metrics видны

### Google Analytics (опционально)

- [ ] GA4 аккаунт создан
- [ ] Measurement ID добавлен в проект
- [ ] Трекинг работает

### Google Search Console

- [ ] Сайт добавлен в Search Console
- [ ] Ownership подтверждён
- [ ] Sitemap отправлен
- [ ] Индексация началась

---

## 🔔 Уведомления (опционально)

### Slack

- [ ] Webhook URL создан
- [ ] Добавлен в Vercel Secrets
- [ ] Уведомления о деплое работают

### Email

- [ ] Email уведомления настроены в Vercel
- [ ] Получены тестовые уведомления

---

## 🎉 Финальная проверка

- [ ] ✅ Сайт работает на production URL
- [ ] ✅ Домен настроен (если нужно)
- [ ] ✅ HTTPS работает
- [ ] ✅ Все функции работают
- [ ] ✅ SEO оптимизация активна
- [ ] ✅ Performance в норме
- [ ] ✅ Мониторинг настроен
- [ ] ✅ Auto-deploy работает

---

## 📝 Post-deployment tasks

После успешного деплоя:

1. **Поделитесь ссылкой:**
   - [ ] Отправьте клиенту
   - [ ] Добавьте в Instagram @weddingtravel.by
   - [ ] Добавьте на визитки

2. **Настройте маркетинг:**
   - [ ] Добавьте в Google My Business
   - [ ] Настройте рекламу (если нужно)
   - [ ] Социальные сети

3. **Документация:**
   - [ ] Обновите README.md
   - [ ] Документируйте изменения
   - [ ] Обучите команду

4. **Резервное копирование:**
   - [ ] Настройте автобэкапы
   - [ ] Создайте recovery plan
   - [ ] Документируйте процесс восстановления

---

## 🆘 Если что-то пошло не так

**Build failed?**
- Проверьте: `npm run build` локально
- Смотрите Build Logs в Vercel
- Читайте: [DEPLOY_NOW.md](./DEPLOY_NOW.md)

**DNS не работает?**
- Подождите 15-30 минут
- Проверьте на dnschecker.org
- Читайте: [domain-setup.md](./docs/deployment/domain-setup.md)

**Environment variables не работают?**
- Проверьте что начинаются с `VITE_`
- Сделайте Redeploy после добавления
- Проверьте в Vercel → Settings → Environment Variables

**404 на маршрутах?**
- Проверьте vercel.json
- Убедитесь что rewrites настроены
- Перечитайте: [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

## 📚 Дополнительные ресурсы

- **[START_HERE.md](./START_HERE.md)** - С чего начать
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Пошаговая инструкция
- **[domain-setup.md](./docs/deployment/domain-setup.md)** - Настройка домена
- **[deployment-flow.md](./docs/deployment/deployment-flow.md)** - Визуальная схема

---

**Создано:** 23 октября 2025  
**Версия:** 1.0

✨ **Удачи с деплоем WeddingTravel!** ✨
