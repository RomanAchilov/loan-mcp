# Настройка переменных окружения в Vercel

## 🎯 Проблема: Preview URL вместо Production URL

Если MCP endpoint возвращает preview URL вида:
```
https://loan-1kpg4hi6j-romanachilovs-projects.vercel.app/chatgpt-widget.js
```

Вместо продакшн URL:
```
https://loan-mcp.vercel.app/chatgpt-widget.js
```

## ✅ Решение: Установите переменную окружения

### Вариант 1: Автоматическое определение (рекомендуется)

Код теперь автоматически использует `VERCEL_PROJECT_PRODUCTION_URL` для production деплоев.

**Просто передеплойте проект после последнего коммита!**

### Вариант 2: Явная установка URL (если нужна кастомизация)

1. Откройте **https://vercel.com/dashboard**
2. Выберите проект **loan-mcp**
3. Перейдите в **Settings → Environment Variables**
4. Нажмите **Add New**
5. Заполните:
   - **Name**: `VITE_APP_URL`
   - **Value**: `https://loan-mcp.vercel.app/`
   - **Environments**: Отметьте **Production**
6. Нажмите **Save**
7. **Redeploy** проект:
   - Перейдите в **Deployments**
   - Найдите последний production деплой
   - Нажмите `...` → **Redeploy**

## 🔍 Проверка после редеплоя

Выполните запрос к MCP endpoint:

```bash
curl -X POST https://loan-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "resources/read",
    "params": {
      "uri": "ui://widget/show-loan.html"
    },
    "id": 1
  }'
```

Должен вернуться HTML с правильным URL:
```html
<script src="https://loan-mcp.vercel.app/chatgpt-widget.js"></script>
```

## 📋 Переменные окружения Vercel (справка)

Vercel автоматически предоставляет:

- `VERCEL_ENV` - окружение: `production`, `preview`, `development`
- `VERCEL_URL` - текущий deployment URL (может быть preview)
- `VERCEL_PROJECT_PRODUCTION_URL` - **продакшн URL проекта** ✅

Мы используем `VERCEL_PROJECT_PRODUCTION_URL` для production деплоев, что гарантирует правильный URL.

## 🚀 После настройки

Ваш MCP endpoint будет возвращать:

```html
<link rel="stylesheet" href="https://loan-mcp.vercel.app/chatgpt-widget.css">
<div id="tanstack-app-root"></div>
<script src="https://loan-mcp.vercel.app/chatgpt-widget.js"></script>
```

✅ Виджет будет доступен по короткому production URL!

