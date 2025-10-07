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
```

---


## 🧠 Использование (CLI)

```bash
node autoposter.js [options]
```



## Аргументы



| Параметр            | Описание                                               |
| ------------------- | ------------------------------------------------------ |
| `--file <path>`     | Путь к `.md` файлу с текстом поста                     |
| `--image <path>`    | Путь к изображению (опционально)                       |
| `--schedule <time>` | Отложенная публикация (например: `"2025-10-06T14:30"`) |
| `--help`            | Показать справку                                       |



🧾 Примеры

🔹 1. Отправить обычный пост с Markdown

```bash
node autoposter.js --file posts/motivation.md
```


🔹 2. Отправить пост с изображением

```bash
node autoposter.js --file posts/quote.md --image images/quote.jpg
```


🔹 3. Запланировать публикацию

```bash
node autoposter.js --file posts/morning.md --schedule "2025-10-07T08:00"
```


🔹 4. Проверить токен и канал

```bash
node autoposter.js --test
```


🧩 Пример motivation.md

```markdown
*💡 Цитата дня*

_"Успех приходит к тем, кто готов учиться и меняться."_

📌 Маленькие шаги каждый день → большие результаты завтра.

#мотивация #цитата #mindset
```


