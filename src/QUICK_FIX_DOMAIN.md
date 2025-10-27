# 🆘 БЫСТРОЕ РЕШЕНИЕ: Домен weddingtravel.by не работает

## 🔴 Ошибка: DNS_PROBE_FINISHED_NXDOMAIN

**Что это значит?** DNS-записи для домена не настроены.

---

## ✅ РЕШЕНИЕ (выберите одно)

### Вариант 1: Временный домен (работает сразу!)

Используйте временный Vercel домен пока настраиваете DNS:

```
https://weddingtravel.vercel.app
```

Этот адрес работает **БЕЗ** настройки DNS! ✅

---

### Вариант 2: Настроить DNS (для постоянного домена)

#### Шаг 1: Где у вас зарегистрирован домен?

Откройте сайт где вы купили **weddingtravel.by**:
- hoster.by
- domains.by  
- tut.by
- другой регистратор

#### Шаг 2: Найдите раздел DNS

Ищите пункт меню:
- "DNS-записи"
- "Управление DNS"
- "DNS Settings"
- "Name Servers"

#### Шаг 3: Добавьте эти записи

**Запись 1:**
```
Тип: A
Имя: @ (или пусто, или weddingtravel.by)
Значение: 76.76.21.21
TTL: 3600
```

**Запись 2:**
```
Тип: CNAME
Имя: www
Значение: cname.vercel-dns.com
TTL: 3600
```

#### Шаг 4: Добавьте домен в Vercel

1. Откройте https://vercel.com/dashboard
2. Выберите проект **weddingtravel**
3. Settings → Domains
4. Add Domain: `weddingtravel.by`
5. Add Domain: `www.weddingtravel.by`

#### Шаг 5: Подождите

⏱️ От 15 минут до 48 часов (обычно 30 минут)

#### Шаг 6: Проверьте

Откройте: https://dnschecker.org

Введите: `weddingtravel.by`

Должно показать IP: `76.76.21.21` ✅

---

## 📞 Нужна помощь?

**Подробные инструкции:**
- [Полный гайд по домену](./docs/deployment/domain-setup.md)
- [Деплой на Vercel](./docs/deployment/vercel-setup.md)

**Не знаете где у вас регистратор?**

Проверьте на: https://www.whois.com/whois/weddingtravel.by

---

## 🎯 Быстрая диагностика

### Проверка 1: Сайт работает на временном домене?

```
https://weddingtravel.vercel.app
```

- ✅ Работает → проблема только в DNS
- ❌ Не работает → проблема в деплое

### Проверка 2: DNS настроен?

**Windows:**
```cmd
nslookup www.weddingtravel.by
```

**Mac/Linux:**
```bash
dig www.weddingtravel.by
```

Должен вернуть IP адрес Vercel.

---

## 💡 Рекомендация

**Для начала используйте временный домен** `weddingtravel.vercel.app`

Настройку DNS можно сделать позже, когда будет время!

---

**Обновлено:** 23 октября 2025
