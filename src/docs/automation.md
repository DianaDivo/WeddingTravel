# 🤖 Automation Guide - WeddingTravel

Полное руководство по автоматизации задач в проекте.

---

## 🎯 Обзор

Проект оснащен **70+ npm скриптами** для автоматизации всех рутинных задач:

- ✅ 15+ команд для разработки
- ✅ 10+ команд для деплоя
- ✅ 15+ команд для Supabase
- ✅ 10+ команд для Git и релизов
- ✅ 20+ утилит и вспомогательных команд

---

## 📦 Установка

### 1. NPM Scripts (уже настроены)

```bash
# Все команды доступны через npm:
npm run <command>
```

### 2. Bash Aliases (опционально)

Для ускорения работы добавьте в `~/.bashrc` или `~/.zshrc`:

```bash
# Загрузить aliases
source /path/to/weddingtravel/.aliases.sh

# Теперь вместо "npm run dev" просто:
wd
```

**Доступные алиасы:**
- `wd` = `npm run dev`
- `wb` = `npm run build`
- `wc` = `npm run check`
- `wdep` = `npm run deploy`
- `sbs` = `npm run supabase:start`
- И еще 30+ алиасов!

### 3. Makefile (опционально)

Для любителей make:

```bash
# Вместо npm run dev:
make dev

# Вместо npm run deploy:
make deploy

# Показать все команды:
make help
```

---

## 🚀 Быстрый старт

### Самые частые команды

```bash
# Разработка
npm run dev                    # Запуск dev сервера
npm run build                  # Сборка проекта
npm run preview                # Preview продакшн билда

# Проверка кода
npm run check                  # Быстрая проверка (type + lint)
npm run validate               # Полная валидация (type + lint + build)
npm run format                 # Форматирование кода

# Деплой
npm run deploy                 # Полный деплой
npm run deploy:frontend        # Только frontend
npm run deploy:supabase        # Только backend
npm run health-check           # Проверка работы

# Supabase
npm run supabase:start         # Запустить локальный Supabase
npm run supabase:stop          # Остановить
npm run supabase:types         # Генерация типов
```

---

## 💻 Для разработчиков

### Утренний workflow

```bash
# 1. Обновить код
npm run git:pull

# 2. Запустить Supabase
npm run supabase:start

# 3. Запустить dev сервер
npm run dev

# Или все вместе:
make start
# или с алиасами:
wstart
```

### Вечерний workflow (коммит)

```bash
# 1. Форматирование + проверка
npm run format
npm run check

# Или одной командой:
npm run wcheck  # с алиасами

# 2. Коммит
git add .
git commit -m "feat: description"

# Или:
npm run git:commit

# 3. Push
npm run git:push
```

### Проверка перед PR

```bash
# Полная валидация
npm run validate:strict

# Или:
make ready
```

---

## 🚢 Для деплоя

### Обычный деплой

```bash
# Автоматический деплой всего
npm run deploy

# Что происходит:
# 1. Проверка environment
# 2. npm install
# 3. Lint + Type check
# 4. Build
# 5. Deploy frontend
# 6. Deploy backend
# 7. Health check
# 8. Notifications
```

### Частичный деплой

```bash
# Только frontend
npm run deploy:frontend

# Только backend (Edge Functions)
npm run deploy:supabase

# Preview деплой (тестирование)
npm run deploy:frontend:preview
```

### Проверка перед деплоем

```bash
# Валидация + health check
npm run deploy:check

# Строгая валидация
npm run validate:strict
```

### Откат

```bash
# Полный откат
npm run rollback

# Только frontend
npm run rollback:frontend
```

---

## 🗄️ Работа с Supabase

### Локальная разработка

```bash
# Запустить локальный Supabase
npm run supabase:start

# Что запускается:
# - PostgreSQL (порт 54322)
# - Studio UI (http://localhost:54323)
# - API (http://localhost:54321)
# - Edge Functions

# Остановить
npm run supabase:stop

# Перезапустить
npm run supabase:restart

# Статус
npm run supabase:status
```

### База данных

```bash
# Push изменений схемы
npm run supabase:db:push

# Сброс БД (ВНИМАНИЕ: удаляет данные!)
npm run supabase:db:reset

# Создать backup
npm run supabase:db:dump
# Создается backup.sql
```

### TypeScript типы

```bash
# Генерация типов из БД
npm run supabase:types

# Создается файл: types/supabase.ts
# Импорт:
import { Database } from './types/supabase';
```

### Edge Functions

```bash
# Локальный запуск
npm run supabase:functions:serve

# Деплой
npm run supabase:functions:deploy

# Просмотр логов (real-time)
npm run supabase:functions:logs
```

---

## 🧹 Утилиты

### Очистка

```bash
# Полная очистка (node_modules + dist + cache)
npm run clean

# Только build
npm run clean:build

# Только зависимости
npm run clean:modules

# Переустановка
npm run reinstall
```

**Когда использовать:**

| Проблема | Решение |
|----------|---------|
| Ошибки с зависимостями | `npm run reinstall` |
| Проблемы с build | `npm run clean:build && npm run build` |
| Все сломалось | `npm run clean && npm install` |

### Обновления

```bash
# Проверить устаревшие пакеты
npm run update:check

# Обновить зависимости
npm run update:deps

# Проверить безопасность
npm run security:audit

# Исправить уязвимости
npm run security:fix
```

### Git

```bash
# Pull
npm run git:pull

# Push
npm run git:push

# Status
npm run git:status

# Commit (интерактивно)
npm run git:commit
```

### Релизы

```bash
# Patch версия (1.0.x) - для багфиксов
npm run release:patch

# Minor версия (1.x.0) - для новых фич
npm run release:minor

# Major версия (x.0.0) - для breaking changes
npm run release:major
```

**Что происходит:**
1. Обновляется version в package.json
2. Создается git commit
3. Создается git tag
4. Push в remote
5. Push tags

---

## 📊 Проверка и валидация

### Типы проверок

```bash
# TypeScript
npm run type-check              # Проверка типов
npm run type-check:watch        # Watch mode

# ESLint
npm run lint                    # Стандартный (макс. 50 warnings)
npm run lint:fix                # Автофикс
npm run lint:strict             # Строгий (0 warnings)

# Prettier
npm run format                  # Форматировать все
npm run format:check            # Проверить форматирование
```

### Комбинированные проверки

```bash
# Быстрая проверка (без build)
npm run check
# = type-check + lint

# Полная валидация
npm run validate
# = type-check + lint + build

# Строгая валидация
npm run validate:strict
# = type-check + lint:strict + build

# Максимальная проверка
npm run check:all
# = validate + format:check
```

### Когда использовать

| Команда | Когда |
|---------|-------|
| `npm run check` | Перед каждым коммитом |
| `npm run validate` | Перед каждым push |
| `npm run validate:strict` | Перед деплоем в production |
| `npm run check:all` | Перед релизом |

---

## 🔄 CI/CD Integration

### Локальная проверка CI

```bash
# Запустить то же, что и CI
npm run ci
# = validate

# С тестами
npm run ci:test
# = check + test
```

### Git Hooks

Автоматически запускаются при git операциях:

```bash
# Pre-commit hook
npm run precommit
# = check

# Pre-push hook
npm run prepush
# = validate
```

**Настройка:**

Создайте `.git/hooks/pre-commit`:
```bash
#!/bin/bash
npm run precommit
```

Создайте `.git/hooks/pre-push`:
```bash
#!/bin/bash
npm run prepush
```

Дайте права:
```bash
chmod +x .git/hooks/*
```

---

## 📈 Анализ

### Bundle анализ

```bash
# Анализ размера bundle
npm run analyze

# Размер каждого файла
npm run analyze:bundle

# Пример вывода:
# dist/assets/index-abc123.js: 250KB
# dist/assets/vendor-def456.js: 180KB
```

### Производительность

```bash
# Lighthouse проверка (в CI)
# Автоматически запускается для PR

# Локально (через Chrome DevTools):
# 1. npm run build
# 2. npm run preview
# 3. Откройте DevTools → Lighthouse
```

---

## 🎯 Рабочие процессы

### Ежедневная разработка

```bash
# Утро
npm run git:pull
npm run supabase:start
npm run dev

# Работа...

# Вечер
npm run format
npm run check
npm run git:commit
npm run git:push
```

### Новая фича

```bash
# 1. Создать ветку
git checkout -b feature/new-feature

# 2. Разработка
npm run dev

# 3. Проверка
npm run validate

# 4. Коммит
git add .
git commit -m "feat: new feature"

# 5. Push и PR
git push origin feature/new-feature
```

### Релиз

```bash
# 1. Убедитесь что main актуален
npm run git:pull

# 2. Валидация
npm run validate:strict

# 3. Создайте релиз
npm run release:minor

# 4. GitHub Actions автоматически задеплоит
```

### Экстренный hotfix

```bash
# 1. Создать ветку от main
git checkout -b hotfix/critical-fix

# 2. Исправить баг
# ... код ...

# 3. Быстрая проверка
npm run check

# 4. Коммит и push
git add .
git commit -m "fix: critical bug"
git push origin hotfix/critical-fix

# 5. Merge в main
# 6. Деплой
npm run deploy

# 7. Если не помогло - откат
npm run rollback
```

---

## 💡 Советы и трюки

### Ускорение разработки

```bash
# 1. Используйте watch modes
npm run type-check:watch &
npm run dev

# 2. Используйте алиасы
source .aliases.sh
wd  # вместо npm run dev

# 3. Используйте Makefile
make start  # вместо npm run supabase:start && npm run dev
```

### Параллельные команды

```bash
# Запустить type-check в фоне
npm run type-check:watch &

# Продолжить работу
npm run dev

# Остановить фоновые процессы
jobs          # Посмотреть список
kill %1       # Остановить job 1
```

### Автоматизация коммитов

```bash
# В .bashrc или .zshrc:
wcommit() {
  npm run format
  npm run check
  git add .
  git commit -m "$1"
  npm run git:push
}

# Использование:
wcommit "feat: new feature"
```

### Мониторинг логов

```bash
# Supabase logs в реальном времени
npm run supabase:functions:logs

# Vercel logs
npm run vercel:logs

# Комбинация (в отдельных терминалах)
# Terminal 1:
npm run supabase:functions:logs

# Terminal 2:
npm run vercel:logs
```

---

## 🆘 Troubleshooting

### Скрипт не работает

```bash
# 1. Убедитесь что зависимости установлены
npm install

# 2. Проверьте версию Node.js
node --version  # Должно быть >= 20

# 3. Очистите cache
npm run clean && npm install

# 4. Проверьте permissions
chmod +x scripts/*.sh
```

### Windows проблемы

Bash скрипты могут не работать на Windows. Решения:

```bash
# 1. Используйте Git Bash
# 2. Используйте WSL
# 3. Или используйте только npm команды без .sh скриптов
```

### Permission denied

```bash
# Дайте права на выполнение
chmod +x scripts/*.sh
chmod +x .aliases.sh
```

---

## 📚 Документация

- [scripts.md](./scripts.md) - Подробное руководство по скриптам
- [commands.md](./commands.md) - Быстрая справка команд
- [ci-cd.md](./ci-cd.md) - CI/CD руководство

---

## ⚡ Шпаргалка

```bash
# Самые частые команды
npm run dev              # Старт
npm run build            # Сборка
npm run deploy           # Деплой
npm run check            # Проверка
npm run format           # Форматирование
npm run supabase:start   # Supabase
npm run health-check     # Мониторинг

# Перед коммитом
npm run format && npm run check

# Перед push
npm run validate

# Перед деплоем
npm run validate:strict && npm run deploy:check

# Если сломалось
npm run clean && npm install
```

---

**Последнее обновление:** 21 октября 2025  
**Всего скриптов:** 70+  
**Версия:** 1.0.0
