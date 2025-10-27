# 🚀 КАК ЗАДЕПЛОИТЬ САЙТ: Пошаговая инструкция

## 📍 ГДЕ ВВОДИТЬ КОМАНДЫ?

### Windows

**1. Откройте папку проекта** в Проводнике:
```
C:\Users\ВашеИмя\weddingtravel\
```

**2. Нажмите правой кнопкой мыши** на пустом месте в папке

**3. Выберите один из вариантов:**

#### Вариант A: Git Bash (рекомендуется)
```
Правая кнопка → Git Bash Here
```
Откроется **чёрное окно** с текстом `(master)` или `(main)`

#### Вариант B: PowerShell
```
Правая кнопка → Открыть в Windows Terminal
или
Shift + Правая кнопка → Открыть окно PowerShell здесь
```
Откроется **синее окно** PowerShell

#### Вариант C: Command Prompt (CMD)
```
Shift + Правая кнопка → Открыть командное окно здесь
```
Откроется **чёрное окно** CMD

---

### Mac / Linux

**1. Откройте Терминал**
- Mac: `Command + Space` → наберите "Terminal" → Enter
- Linux: `Ctrl + Alt + T`

**2. Перейдите в папку проекта:**
```bash
cd ~/weddingtravel
# или
cd /путь/к/вашему/проекту/weddingtravel
```

---

### VS Code (любая ОС)

**1. Откройте проект в VS Code**

**2. Откройте встроенный терминал:**
```
Меню: Terminal → New Terminal
или
Ctrl + ` (backtick)
или
View → Terminal
```

Появится **панель внизу** с терминалом ✅

---

## ✅ ТЕПЕРЬ ВВОДИТЕ КОМАНДЫ

### Шаг 1: Проверьте что вы в правильной папке

Введите:
```bash
pwd
```

**Должно показать:**
```
/путь/к/вашему/проекту/weddingtravel
```

**Или на Windows:**
```
C:\Users\ВашеИмя\weddingtravel
```

✅ **Если видите путь к проекту - всё правильно!**

---

### Шаг 2: Проверьте наличие файлов

Введите:
```bash
ls
# или на Windows CMD:
dir
```

**Должны увидеть файлы:**
```
App.tsx
package.json
README.md
...
```

✅ **Если видите эти файлы - вы в правильном месте!**

---

### Шаг 3: Инициализируйте Git

**Скопируйте и вставьте эти команды по очереди:**

```bash
# 1. Инициализация Git
git init
```

**Ответ должен быть:**
```
Initialized empty Git repository in /путь/к/проекту/.git/
```

```bash
# 2. Добавить все файлы
git add .
```

**Ответ:** (может ничего не показать - это нормально!)

```bash
# 3. Сделать первый коммит
git commit -m "Initial commit: WeddingTravel website"
```

**Ответ должен быть:**
```
[master (root-commit) abc1234] Initial commit: WeddingTravel website
 123 files changed, 12345 insertions(+)
 create mode 100644 App.tsx
 ...
```

✅ **Git настроен!**

---

### Шаг 4: Создайте репозиторий на GitHub

**1. Откройте браузер**

**2. Перейдите на:** https://github.com/new

**3. Заполните форму:**
```
Repository name: weddingtravel
Description: Современный сайт свадебного агентства WeddingTravel
Public или Private: на ваш выбор
```

**4. НЕ выбирайте:**
- ❌ Add a README file
- ❌ Add .gitignore
- ❌ Choose a license

**5. Нажмите:** Create repository

**6. Скопируйте URL репозитория:**
```
https://github.com/ВАШ-USERNAME/weddingtravel.git
```

---

### Шаг 5: Подключите GitHub

**В терминале введите** (замените на ВАШИ данные):

```bash
# Замените YOUR-USERNAME на ваш username!
git remote add origin https://github.com/YOUR-USERNAME/weddingtravel.git
```

Например:
```bash
git remote add origin https://github.com/maria-ivanova/weddingtravel.git
```

**Проверьте:**
```bash
git remote -v
```

**Должно показать:**
```
origin  https://github.com/YOUR-USERNAME/weddingtravel.git (fetch)
origin  https://github.com/YOUR-USERNAME/weddingtravel.git (push)
```

---

### Шаг 6: Загрузите код на GitHub

```bash
git branch -M main
git push -u origin main
```

**GitHub попросит авторизацию!**

#### Windows / Mac - появится окно:
- Введите **username** и **password** (или Personal Access Token)

#### Если просит пароль в терминале:
1. Перейдите на: https://github.com/settings/tokens
2. Generate new token (classic)
3. Выберите срок и права: `repo` (полный доступ)
4. **Скопируйте токен!** (показывается только один раз)
5. Используйте **токен вместо пароля**

**После успешной загрузки увидите:**
```
Enumerating objects: 123, done.
Counting objects: 100% (123/123), done.
...
To https://github.com/YOUR-USERNAME/weddingtravel.git
 * [new branch]      main -> main
```

✅ **Код на GitHub!**

**Проверьте:** Откройте https://github.com/YOUR-USERNAME/weddingtravel
Должны увидеть все файлы проекта! ✅

---

## 🎯 ТЕПЕРЬ ДЕПЛОЙ НА VERCEL

### Способ 1: Через браузер (САМЫЙ ПРОСТОЙ!)

**1. Откройте:** https://vercel.com/signup

**2. Зарегистрируйтесь:**
- Нажмите **Continue with GitHub**
- Авторизуйтесь в GitHub
- Разрешите доступ Vercel

**3. Импортируйте проект:**
- Откройте: https://vercel.com/new
- Нажмите **Import Git Repository**
- Найдите репозиторий **weddingtravel**
- Нажмите **Import**

**4. Настройте проект:**

```
Project Name: weddingtravel
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**5. Добавьте Environment Variables:**

Нажмите **Environment Variables** и добавьте:

```
Name: VITE_SUPABASE_URL
Value: https://ваш-проект.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: ваш-anon-key
```

**Где взять эти данные?**
1. Откройте https://supabase.com/dashboard
2. Выберите ваш проект
3. Settings → API
4. Скопируйте:
   - **Project URL** → это VITE_SUPABASE_URL
   - **Project API keys** → anon public → это VITE_SUPABASE_ANON_KEY

**6. Нажмите Deploy!**

⏱️ Подождите 2-3 минуты...

**7. Готово! 🎉**

Ваш сайт будет доступен:
```
https://weddingtravel-ваш-username.vercel.app
```

**Откройте ссылку и проверьте сайт!** ✅

---

### Способ 2: Через терминал (для продвинутых)

**В том же терминале введите:**

```bash
# 1. Установите Vercel CLI
npm install -g vercel
```

**Подождите установки...**

```bash
# 2. Войдите в Vercel
vercel login
```

**Выберите:**
```
> Continue with GitHub
```

Откроется браузер → авторизуйтесь

**В терминале появится:**
```
✅ Success! GitHub authentication complete
```

```bash
# 3. Деплой проекта
vercel
```

**Ответьте на вопросы:**
```
? Set up and deploy "~/weddingtravel"? [Y/n] y
? Which scope do you want to deploy to? ВАШ-USERNAME
? Link to existing project? [y/N] n
? What's your project's name? weddingtravel
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

**Подождите...**

```bash
# 4. Добавьте переменные окружения
vercel env add VITE_SUPABASE_URL production
```

**Введите значение:** https://ваш-проект.supabase.co

```bash
vercel env add VITE_SUPABASE_ANON_KEY production
```

**Введите значение:** ваш-anon-key

```bash
# 5. Production деплой
vercel --prod
```

**Готово! 🎉**

```
✅ Production: https://weddingtravel.vercel.app
```

---

## 🎊 ПОЗДРАВЛЯЮ! Сайт задеплоен!

### Что дальше?

1. **Откройте сайт** по URL который дал Vercel
2. **Проверьте все функции** работают
3. **Настройте домен** weddingtravel.by (опционально)

---

## 🌐 Настройка домена (опционально)

### 1. В Vercel

1. Откройте: https://vercel.com/dashboard
2. Выберите проект **weddingtravel**
3. Settings → Domains
4. Add Domain
5. Введите: `weddingtravel.by`
6. Add
7. Введите: `www.weddingtravel.by`
8. Add

Vercel покажет какие DNS записи нужно создать.

### 2. У регистратора домена

**Где вы купили домен?** (hoster.by / domains.by / tut.by)

1. Войдите в панель управления
2. Найдите раздел **DNS** или **DNS-записи**
3. Добавьте записи:

```
Тип: A
Имя: @ (или пусто)
Значение: 76.76.21.21
TTL: 3600
```

```
Тип: CNAME
Имя: www
Значение: cname.vercel-dns.com
TTL: 3600
```

4. Сохраните

⏱️ **Подождите 15-30 минут** для распространения DNS

5. **Проверьте:** https://dnschecker.org
   - Введите: weddingtravel.by
   - Должно показать IP: 76.76.21.21 ✅

6. **Откройте:** https://weddingtravel.by
   - Сайт должен открыться! ✅

---

## 📋 Краткая справка команд

### Git команды:
```bash
git status              # Проверить статус
git add .               # Добавить все файлы
git commit -m "текст"   # Сделать коммит
git push                # Загрузить на GitHub
git pull                # Скачать с GitHub
```

### npm команды:
```bash
npm install             # Установить зависимости
npm run dev             # Запустить локально
npm run build           # Собрать проект
npm run deploy:check    # Проверка готовности
```

### Vercel команды:
```bash
vercel                  # Деплой preview
vercel --prod           # Деплой production
vercel ls               # Список деплоев
vercel logs             # Посмотреть логи
```

---

## 🆘 Если что-то не работает

### Ошибка: "git: command not found"
**Решение:** Установите Git
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt install git`

### Ошибка: "npm: command not found"
**Решение:** Установите Node.js
- https://nodejs.org/ (скачайте LTS версию)

### Ошибка: "Permission denied"
**Решение:**
- Windows: Запустите терминал от имени администратора
- Mac/Linux: Используйте `sudo` перед командой

### GitHub просит пароль
**Решение:** Используйте Personal Access Token
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Выберите `repo` права
4. Используйте токен вместо пароля

### Build failed в Vercel
**Решение:**
1. Проверьте локально: `npm run build`
2. Смотрите логи в Vercel Dashboard
3. Проверьте Environment Variables добавлены

---

## 📞 Поддержка

**Дополнительные гайды:**
- [DEPLOY_NOW.md](./DEPLOY_NOW.md) - Подробная инструкция
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Чеклист
- [domain-setup.md](./docs/deployment/domain-setup.md) - Настройка домена

---

**Создано:** 23 октября 2025  
**Для:** WeddingTravel

🚀 **Удачи с деплоем!** 🚀
