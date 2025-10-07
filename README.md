# 🤖 AutoPoster — Telegram Markdown Auto Publisher (MVP)

Автоматизируй публикации в Telegram-каналах с помощью простого CLI-скрипта на **Node.js**.  
Поддерживает **Markdown**, **изображения**, **таймеры публикации** и **авторизацию через Bot Token**.

---

## 🚀 Возможности

✅ Отправка постов в Telegram-канал  
✅ Поддержка форматирования Markdown  
✅ Прикрепление изображений  
✅ Задержка или отложенная публикация  
✅ Простая CLI-утилита — без лишних зависимостей  
✅ Готово к деплою на VPS / cron / GitHub Actions

---

## 🧩 Технологии

- Node.js 18+
- Telegram Bot API
- `node-fetch` или `axios`
- `dotenv` (для конфигурации)

---

## ⚙️ Установка

```bash
git clone https://github.com/HenadiyV/autoposter.git
cd autoposter
npm install
cp .env.example .env
