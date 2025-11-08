#!/bin/bash

# 🔍 Проверка готовности к деплою на Vercel

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 WeddingTravel - Deploy Readiness Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Функция для проверки
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        ((ERRORS++))
        return 1
    fi
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

echo "📦 Проверка зависимостей..."
echo "────────────────────────────────────────"

# Проверка Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js установлен: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js не установлен"
    ((ERRORS++))
fi

# Проверка npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm установлен: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm не установлен"
    ((ERRORS++))
fi

# Проверка git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} git установлен: $GIT_VERSION"
else
    echo -e "${RED}✗${NC} git не установлен"
    ((ERRORS++))
fi

echo ""
echo "📂 Проверка файлов проекта..."
echo "────────────────────────────────────────"

# Проверка наличия package.json
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json существует"
else
    echo -e "${RED}✗${NC} package.json не найден"
    ((ERRORS++))
fi

# Проверка наличия vercel.json
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✓${NC} vercel.json существует"
else
    warn "vercel.json не найден (не критично)"
fi

# Проверка наличия index.html
if [ -f "index.html" ]; then
    echo -e "${GREEN}✓${NC} index.html существует"
else
    echo -e "${RED}✗${NC} index.html не найден"
    ((ERRORS++))
fi

# Проверка наличия App.tsx
if [ -f "App.tsx" ]; then
    echo -e "${GREEN}✓${NC} App.tsx существует"
else
    echo -e "${RED}✗${NC} App.tsx не найден"
    ((ERRORS++))
fi

# Проверка наличия vite.config
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
    echo -e "${GREEN}✓${NC} vite.config существует"
else
    warn "vite.config не найден"
fi

echo ""
echo "🔧 Проверка конфигурации..."
echo "────────────────────────────────────────"

# Проверка скриптов в package.json
if grep -q "\"build\":" package.json; then
    echo -e "${GREEN}✓${NC} build скрипт найден"
else
    echo -e "${RED}✗${NC} build скрипт отсутствует в package.json"
    ((ERRORS++))
fi

if grep -q "\"dev\":" package.json; then
    echo -e "${GREEN}✓${NC} dev скрипт найден"
else
    warn "dev скрипт отсутствует в package.json"
fi

echo ""
echo "📦 Проверка зависимостей..."
echo "────────────────────────────────────────"

# Проверка node_modules
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules существует"
else
    warn "node_modules не найден. Выполните: npm install"
fi

# Проверка package-lock.json
if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✓${NC} package-lock.json существует"
else
    warn "package-lock.json не найден"
fi

echo ""
echo "🔨 Проверка сборки..."
echo "────────────────────────────────────────"

# Попытка сборки
info "Попытка сборки проекта..."
if npm run build &> /dev/null; then
    echo -e "${GREEN}✓${NC} Проект успешно собирается"
    
    # Проверка dist
    if [ -d "dist" ]; then
        echo -e "${GREEN}✓${NC} dist папка создана"
        
        # Проверка размера
        DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
        info "Размер build: $DIST_SIZE"
    else
        echo -e "${RED}✗${NC} dist папка не создана после сборки"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗${NC} Ошибка при сборке проекта"
    echo -e "${YELLOW}Выполните: npm run build${NC}"
    ((ERRORS++))
fi

echo ""
echo "🌐 Проверка Git..."
echo "────────────────────────────────────────"

# Проверка git init
if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Git репозиторий инициализирован"
    
    # Проверка remote
    if git remote -v &> /dev/null | grep -q "origin"; then
        REMOTE_URL=$(git remote get-url origin 2>/dev/null)
        echo -e "${GREEN}✓${NC} Remote origin настроен: $REMOTE_URL"
    else
        warn "Remote origin не настроен"
        info "Выполните: git remote add origin <URL>"
    fi
    
    # Проверка статуса
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "${GREEN}✓${NC} Нет незакоммиченных изменений"
    else
        warn "Есть незакоммиченные изменения"
        info "Выполните: git add . && git commit -m 'Update'"
    fi
else
    warn "Git не инициализирован"
    info "Выполните: git init"
fi

echo ""
echo "🔐 Проверка переменных окружения..."
echo "────────────────────────────────────────"

# Проверка .env файла
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env файл существует"
    
    # Проверка наличия необходимых переменных
    if grep -q "VITE_SUPABASE_URL" .env; then
        echo -e "${GREEN}✓${NC} VITE_SUPABASE_URL найдена в .env"
    else
        warn "VITE_SUPABASE_URL отсутствует в .env"
    fi
    
    if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
        echo -e "${GREEN}✓${NC} VITE_SUPABASE_ANON_KEY найдена в .env"
    else
        warn "VITE_SUPABASE_ANON_KEY отсутствует в .env"
    fi
else
    warn ".env файл не найден"
    info "Создайте .env с переменными Supabase"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 РЕЗУЛЬТАТ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ ВСЁ ГОТОВО К ДЕПЛОЮ!${NC}"
    echo ""
    echo "Следующие шаги:"
    echo "1. Откройте: https://vercel.com/new"
    echo "2. Import Git Repository"
    echo "3. Добавьте Environment Variables в Vercel"
    echo "4. Deploy!"
    echo ""
    echo "Или используйте CLI:"
    echo "  npm install -g vercel"
    echo "  vercel login"
    echo "  vercel"
    echo ""
else
    echo -e "${RED}❌ НАЙДЕНО $ERRORS ОШИБОК${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  И $WARNINGS ПРЕДУПРЕЖДЕНИЙ${NC}"
    fi
    echo ""
    echo "Исправьте ошибки перед деплоем."
    echo ""
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Предупреждений: $WARNINGS${NC}"
    echo ""
fi

echo "📚 Документация:"
echo "  - START_HERE.md - Начните отсюда"
echo "  - DEPLOY_NOW.md - Подробная инструкция"
echo "  - docs/deployment/vercel-setup.md - Vercel гайд"
echo ""

exit $ERRORS
