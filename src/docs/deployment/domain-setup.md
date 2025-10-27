# 🌐 Настройка домена weddingtravel.by

## 📋 Проблема

**Ошибка:** `DNS_PROBE_FINISHED_NXDOMAIN` при попытке открыть www.weddingtravel.by

**Причина:** DNS-записи для домена не настроены или настроены неправильно.

---

## ✅ Решение: Пошаговая настройка

### Шаг 1: Определите где у вас хостится сайт

**Вариант A: Vercel** (рекомендуется для этого проекта)  
**Вариант B: Netlify**  
**Вариант C: Другой хостинг**

---

## 🚀 Вариант A: Настройка домена на Vercel

### 1. Добавьте домен в Vercel

1. Откройте **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Выберите ваш проект **WeddingTravel**
3. Перейдите в **Settings → Domains**
4. Нажмите **Add Domain**
5. Введите: `weddingtravel.by`
6. Нажмите **Add**

Vercel покажет вам какие DNS записи нужно создать.

### 2. Настройте DNS у регистратора домена

Откройте панель управления DNS у вашего регистратора домена (где вы купили weddingtravel.by).

**Для Беларуси это может быть:**
- hoster.by
- domains.by
- tut.by
- другой регистратор

#### Создайте следующие DNS записи:

**Вариант 1: Использовать www.weddingtravel.by (рекомендуется)**

```
Тип: CNAME
Имя: www
Значение: cname.vercel-dns.com
TTL: 3600
```

```
Тип: A
Имя: @ (или пусто для корневого домена)
Значение: 76.76.21.21
TTL: 3600
```

**Вариант 2: Использовать только weddingtravel.by (без www)**

```
Тип: A
Имя: @ (или пусто)
Значение: 76.76.21.21
TTL: 3600
```

```
Тип: CNAME
Имя: www
Значение: weddingtravel.by
TTL: 3600
```

### 3. Подождите распространения DNS

⏱️ **Время ожидания:** от 5 минут до 48 часов (обычно 15-30 минут)

Проверьте статус:
```bash
# Windows (Command Prompt)
nslookup www.weddingtravel.by

# Linux / Mac
dig www.weddingtravel.by
```

### 4. Проверьте в Vercel

После распространения DNS, в Vercel должно появиться:
- ✅ **Valid Configuration**

---

## 🌐 Вариант B: Настройка домена на Netlify

### 1. Добавьте домен в Netlify

1. Откройте **[Netlify Dashboard](https://app.netlify.com/)**
2. Выберите ваш сайт
3. Перейдите в **Domain settings**
4. Нажмите **Add custom domain**
5. Введите: `weddingtravel.by`

### 2. Настройте DNS

**Используйте Netlify DNS (рекомендуется):**

1. В Netlify выберите **Use Netlify DNS**
2. Netlify покажет name servers (например: `dns1.p03.nsone.net`)
3. Перейдите к регистратору домена
4. Замените name servers на те, что показал Netlify

**Или настройте вручную:**

```
Тип: CNAME
Имя: www
Значение: ваш-сайт.netlify.app
```

```
Тип: A
Имя: @
Значение: 75.2.60.5
```

---

## 🔍 Диагностика проблем

### Проверка 1: DNS распространился?

**Windows:**
```cmd
nslookup www.weddingtravel.by
```

**Linux / Mac:**
```bash
dig www.weddingtravel.by
# или
host www.weddingtravel.by
```

**Онлайн инструменты:**
- https://dnschecker.org - проверка DNS по всему миру
- https://www.whatsmydns.net - глобальная проверка

### Проверка 2: Правильные ли DNS записи?

Должно быть:
```
www.weddingtravel.by → CNAME → cname.vercel-dns.com (или netlify)
weddingtravel.by → A → IP адрес хостинга
```

### Проверка 3: SSL сертификат

После настройки домена, Vercel/Netlify автоматически создадут SSL сертификат (может занять 5-10 минут).

---

## 🛠️ Инструкция для популярных регистраторов .by

### hoster.by

1. Войдите на https://hoster.by
2. **Мои услуги → Домены**
3. Выберите **weddingtravel.by**
4. **DNS-записи** или **Управление DNS**
5. Добавьте записи как указано выше

### domains.by

1. Войдите на https://domains.by
2. **Список доменов**
3. Выберите **weddingtravel.by**
4. **DNS настройки**
5. Добавьте записи

### tut.by / hoster.by

1. Панель управления
2. Раздел DNS
3. Добавьте A и CNAME записи

---

## ⚡ Быстрое решение (временное)

Если вам нужно срочно проверить сайт, используйте временный домен:

**Vercel:**
```
https://weddingtravel.vercel.app
```

**Netlify:**
```
https://weddingtravel.netlify.app
```

Эти домены работают сразу без настройки DNS!

---

## 📋 Чек-лист настройки домена

- [ ] Проект задеплоен на Vercel/Netlify
- [ ] Домен добавлен в настройках хостинга
- [ ] DNS записи созданы у регистратора
- [ ] Подождали 15-30 минут для распространения DNS
- [ ] Проверили с помощью nslookup/dig
- [ ] Проверили на dnschecker.org
- [ ] SSL сертификат автоматически выпущен
- [ ] Сайт открывается по домену ✅

---

## 🆘 Если ничего не помогло

### Вариант 1: Используйте Vercel/Netlify DNS

Самый простой способ - делегировать DNS хостингу:

1. В Vercel/Netlify выберите "Use Vercel/Netlify DNS"
2. Скопируйте name servers
3. У регистратора замените name servers
4. Подождите 24-48 часов

### Вариант 2: Обратитесь в поддержку

- **Поддержка регистратора** - если проблема с DNS
- **Поддержка Vercel** - https://vercel.com/support
- **Поддержка Netlify** - https://www.netlify.com/support/

---

## 📝 Полезные ссылки

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [DNSChecker](https://dnschecker.org)
- [WhatsMyDNS](https://www.whatsmydns.net)

---

## 💡 Рекомендации

1. **Используйте www** - `www.weddingtravel.by` (лучше для SEO)
2. **Настройте редирект** - `weddingtravel.by` → `www.weddingtravel.by`
3. **Включите HTTPS** - Vercel/Netlify сделают автоматически
4. **Добавьте мета-теги** - уже настроены в проекте
5. **Проверьте в Google Search Console** - после настройки домена

---

**Последнее обновление:** 23 октября 2025

Удачи с настройкой! 🚀
