# 🚀 Быстрые команды - WeddingTravel

Полная справка всех доступных команд проекта.

## 📦 Основные команды разработки

```bash
# Запуск проекта
npm run dev                    # Запуск dev сервера (Vite)
npm start                      # Алиас для npm run dev

# Билд для продакшена
npm run build                  # TypeScript + Vite build
npm run preview                # Preview продакшн билда

# Проверка типов
npm run type-check             # Проверка TypeScript типов
npm run type-check:watch       # Проверка в watch mode

# Линтинг
npm run lint                   # ESLint проверка (макс. 50 warnings)
npm run lint:fix               # Автофикс линтинга
npm run lint:strict            # Строгий lint (0 warnings)

# Форматирование кода
npm run format                 # Форматировать все файлы (Prettier)
npm run format:check           # Проверить форматирование

# Валидация
npm run validate               # type-check + lint + build
npm run validate:strict        # Строгая валидация
npm run check                  # type-check + lint
npm run check:all              # validate + format check
```

## 🚀 CI/CD команды

```bash
# Деплой
npm run deploy                 # Полный деплой (frontend + backend)
npm run deploy:frontend        # Деплой только frontend (Vercel prod)
npm run deploy:frontend:preview # Деплой preview (Vercel)
npm run deploy:supabase        # Деплой Supabase functions
npm run deploy:check           # Валидация + health check перед деплоем

# Откат
npm run rollback               # Откат к предыдущей версии (все)
npm run rollback:frontend      # Откат только frontend (Vercel)

# Мониторинг
npm run health-check           # Проверка работоспособности prod
npm run health:local           # Проверка локального сервера

# CI
npm run ci                     # CI процесс (validate)
npm run ci:test                # CI с тестами
```

## 🗄️ Supabase команды

```bash
# Управление сервисами
npm run supabase:start         # Запуск локального Supabase
npm run supabase:stop          # Остановка Supabase
npm run supabase:restart       # Перезапуск
npm run supabase:status        # Статус сервисов

# База данных
npm run supabase:db:push       # Push изменений схемы
npm run supabase:db:reset      # Сброс БД
npm run supabase:db:dump       # Создать backup.sql

# Типы
npm run supabase:types         # Генерация TypeScript типов из БД

# Edge Functions
npm run supabase:functions:serve   # Запуск functions локально
npm run supabase:functions:deploy  # Деплой functions
npm run supabase:functions:logs    # Просмотр логов (follow)

# Управление проектом
npm run supabase:link          # Связать с проектом
```

## 🐳 Docker команды

```bash
# Development
npm run docker:dev             # Запуск dev сервера в Docker
npm run docker:dev:build       # С пересборкой
npm run docker:dev:bg          # В фоновом режиме

# Production
npm run docker:prod            # Запуск production в Docker
npm run docker:prod:build      # С пересборкой

# Build
npm run docker:build           # Собрать образы
npm run docker:build:nocache   # Без cache

# Management
npm run docker:stop            # Остановить контейнеры
npm run docker:stop:clean      # Остановить + удалить volumes
npm run docker:restart         # Перезапустить
npm run docker:ps              # Статус контейнеров

# Logs
npm run docker:logs            # Все логи
npm run docker:logs:dev        # Логи dev
npm run docker:logs:prod       # Логи prod

# Utilities
npm run docker:clean           # Полная очистка
npm run docker:shell           # Shell в dev контейнере
npm run docker:health          # Health check
```

## 🔧 Утилиты

```bash
# Очистка
npm run clean                  # Удалить node_modules + dist
npm run clean:build            # Удалить только dist
npm run clean:modules          # Удалить только node_modules
npm run reinstall              # Полная переустановка зависимостей

# Git
npm run git:pull               # git pull origin main
npm run git:push               # git push origin main  
npm run git:status             # git status
npm run git:commit             # git add . && git commit

# Релизы
npm run release:patch          # Релиз patch версии (1.0.x)
npm run release:minor          # Релиз minor версии (1.x.0)
npm run release:major          # Релиз major версии (x.0.0)

# Анализ
npm run analyze                # Анализ bundle
npm run analyze:bundle         # Размер build файлов

# Обновления
npm run update:deps            # Обновить зависимости
npm run update:check           # Проверить outdated пакеты

# Безопасность
npm run security:audit         # NPM audit
npm run security:fix           # NPM audit fix
npm run security:check         # Audit moderate level

# Информация
npm run info                   # Версии всех инструментов
```

## 🎣 Git Hooks

```bash
npm run precommit              # Запускается перед коммитом
npm run prepush                # Запускается перед push
```

## 📊 Основные эндпоинты API

```typescript
// Portfolio
GET  /make-server-f7a2cc63/portfolio      # Получить все проекты
POST /make-server-f7a2cc63/portfolio      # Создать проект
PUT  /make-server-f7a2cc63/portfolio/:id  # Обновить проект
DEL  /make-server-f7a2cc63/portfolio/:id  # Удалить проект

// Blog
GET  /make-server-f7a2cc63/blog           # Получить все статьи
POST /make-server-f7a2cc63/blog           # Создать статью
PUT  /make-server-f7a2cc63/blog/:id       # Обновить статью
DEL  /make-server-f7a2cc63/blog/:id       # Удалить статью

// Bookings
POST /make-server-f7a2cc63/bookings       # Отправить заявку
```

## ✅ Чеклист перед деплоем

- [ ] Проверить все переменные окружения
- [ ] Обновить мета-теги и описания
- [ ] Проверить все ссылки и изображения
- [ ] Протестировать формы и модальные окна
- [ ] Проверить мобильную версию
- [ ] Протестировать SEO (lighthouse)
- [ ] Задеплоить Supabase функции
- [ ] Проверить CORS настройки
- [ ] Протестировать все API эндпоинты

---

📖 Подробнее: [automation.md](./automation.md) - 70+ npm скриптов

**Последнее обновление**: 21 октября 2025
