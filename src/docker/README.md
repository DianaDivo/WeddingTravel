# Docker Configuration - WeddingTravel

Конфигурационные файлы для Docker развертывания.

## 📁 Структура

```
docker/
├── README.md              # Этот файл
├── nginx.conf             # Основная конфигурация Nginx
├── default.conf           # Server block для приложения
├── nginx-proxy.conf       # Reverse proxy с SSL
└── env.sh                 # Runtime environment injection
```

## 📋 Описание файлов

### nginx.conf

Основная конфигурация Nginx сервера:
- Worker processes и connections
- Logging configuration
- Gzip compression
- Security headers
- MIME types

**Используется:** В production Docker образе

### default.conf

Server block для основного приложения:
- SPA routing с `try_files`
- Caching headers для статических assets
- Health check endpoint `/health`
- Proxy для API (опционально)
- Security headers

**Используется:** В production Docker образе

### nginx-proxy.conf

Reverse proxy конфигурация:
- HTTP -> HTTPS redirect
- SSL/TLS configuration
- Rate limiting
- Upstream балансировка
- Security headers

**Используется:** С `docker-compose --profile with-proxy`

**Требует:** SSL сертификаты в `/docker/ssl/`

### env.sh

Bash скрипт для runtime injection переменных окружения:
- Заменяет placeholders в JS файлах
- Позволяет менять env vars без rebuild
- Автоматически запускается при старте контейнера

**Используется:** В production Docker образе

## 🚀 Быстрый старт

### Development

```bash
# Запустить dev сервер
npm run docker:dev

# Доступ: http://localhost:5173
```

### Production

```bash
# Запустить production
npm run docker:prod

# Доступ: http://localhost:80
```

### С Reverse Proxy

```bash
# 1. Подготовить SSL сертификаты
mkdir -p ssl
cp /path/to/fullchain.pem ssl/
cp /path/to/privkey.pem ssl/

# 2. Запустить с proxy
docker-compose --profile with-proxy up -d

# Доступ: https://localhost
```

## ⚙️ Настройка

### Изменение портов

В `docker-compose.yml`:

```yaml
ports:
  - "3000:5173"  # Dev: host:container
  - "8080:80"    # Prod: host:container
```

### Resource limits

В `docker-compose.prod.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '2'      # Изменить лимит CPU
      memory: 1G     # Изменить лимит памяти
```

### Caching

В `default.conf`:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico)$ {
    expires 1y;  # Изменить время кэширования
}
```

## 🔐 SSL Сертификаты

### Let's Encrypt

```bash
# 1. Установить certbot
sudo apt-get install certbot

# 2. Получить сертификат
sudo certbot certonly --standalone -d weddingtravel.by

# 3. Скопировать в docker/ssl/
mkdir -p docker/ssl
sudo cp /etc/letsencrypt/live/weddingtravel.by/fullchain.pem docker/ssl/
sudo cp /etc/letsencrypt/live/weddingtravel.by/privkey.pem docker/ssl/

# 4. Дать права
sudo chmod 644 docker/ssl/*.pem
```

### Самоподписанные (для тестирования)

```bash
# Создать самоподписанный сертификат
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/ssl/privkey.pem \
  -out docker/ssl/fullchain.pem \
  -subj "/CN=localhost"
```

## 🛠️ Кастомизация

### Добавление нового location

В `default.conf`:

```nginx
# Новый endpoint
location /custom-api/ {
    proxy_pass http://backend:3000/;
    proxy_set_header Host $host;
}
```

### Изменение gzip уровня

В `nginx.conf`:

```nginx
gzip_comp_level 9;  # 1-9, выше = больше CPU, меньше размер
```

### Rate limiting

В `nginx-proxy.conf`:

```nginx
# Изменить лимиты
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;  # 5 req/sec
```

## 📊 Мониторинг

### Логи Nginx

```bash
# Внутри контейнера
docker exec weddingtravel-prod tail -f /var/log/nginx/access.log
docker exec weddingtravel-prod tail -f /var/log/nginx/error.log

# Через docker-compose
docker-compose logs -f frontend-prod
```

### Health check

```bash
# Проверить health endpoint
curl http://localhost:80/health

# Должен вернуть: "healthy"
```

### Метрики

```bash
# Использование ресурсов
docker stats weddingtravel-prod

# Nginx статус (добавьте в default.conf)
location /nginx_status {
    stub_status on;
    access_log off;
    allow 127.0.0.1;
    deny all;
}
```

## 🔍 Troubleshooting

### Nginx не запускается

```bash
# Проверить синтаксис
docker run --rm -v $(pwd)/docker:/etc/nginx nginx:alpine nginx -t

# Проверить логи
docker logs weddingtravel-prod
```

### 403 Forbidden

```bash
# Проверить права на файлы
docker exec weddingtravel-prod ls -la /usr/share/nginx/html

# Должно быть: nginx:nginx или root:root
```

### SSL ошибки

```bash
# Проверить сертификаты
docker exec weddingtravel-prod ls -la /etc/nginx/ssl/

# Проверить права
docker exec weddingtravel-prod cat /etc/nginx/ssl/fullchain.pem
```

## 📚 Дополнительные ресурсы

- [DOCKER_GUIDE.md](../DOCKER_GUIDE.md) - Полное руководство
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

**Последнее обновление:** 30 сентября 2025