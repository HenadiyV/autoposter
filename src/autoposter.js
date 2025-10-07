#!/usr/bin/env node
/**
 * AutoPoster (MVP)
 * CLI Telegram Publisher with Markdown support
 * --------------------------------------------
 * Usage:
 *   node autoposter.js --file post.md
 *   node autoposter.js --file post.md --image ./img.jpg --delay 3600
 *   node autoposter.js --json '{"text":"*Hello!*","image":"./img.jpg"}'
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";

// --------------------------------------------
// Init
// --------------------------------------------
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CLI аргументы
const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1]] : []))
);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHANNEL_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("❌ Ошибка: не найден TELEGRAM_BOT_TOKEN или TELEGRAM_CHANNEL_ID в .env");
  process.exit(1);
}

// --------------------------------------------
// Helpers
// --------------------------------------------
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function sendMessage(text, imagePath = null) {
  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}`;
  const formData = new FormData();

  if (imagePath) {
    const fileBuffer = fs.readFileSync(imagePath);
    formData.append("chat_id", CHAT_ID);
    formData.append("caption", text);
    formData.append("parse_mode", "Markdown");
    formData.append("photo", new Blob([fileBuffer]), path.basename(imagePath));

    const res = await fetch(`${apiUrl}/sendPhoto`, { method: "POST", body: formData });
    const data = await res.json();
    if (!data.ok) throw new Error(data.description);
  } else {
    const res = await fetch(`${apiUrl}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.description);
  }
}

// --------------------------------------------
// Main
// --------------------------------------------
(async () => {
  try {
    let text = "";
    let imagePath = null;

    if (args.json) {
      const jsonData = JSON.parse(args.json);
      text = jsonData.text || "";
      imagePath = jsonData.image || null;
    } else if (args.file) {
      const filePath = path.resolve(__dirname, args.file);
      text = fs.readFileSync(filePath, "utf-8");
      if (args.image) imagePath = args.image;
    } else {
      console.error("❌ Не указан параметр --file или --json");
      process.exit(1);
    }

    const delay = parseInt(args.delay || 0);
    if (delay > 0) {
      console.log(`⏳ Ожидание ${delay} секунд перед публикацией...`);
      await sleep(delay * 1000);
    }

      // --- Handle schedule ---
    if (args.schedule) {
      const targetTime = new Date(args.schedule);
      if (isNaN(targetTime.getTime())) {
        console.error("❌ Неверный формат времени. Используй YYYY-MM-DDTHH:mm");
        process.exit(1);
      }
      const now = new Date();
      const diff = targetTime - now;
      if (diff > 0) {
        const diffMin = Math.round(diff / 60000);
        console.log(`🕒 Запланировано на ${targetTime.toLocaleString()} (через ${diffMin} мин)`);
        await sleep(diff);
      } else {
        console.log("⚠️ Указанное время уже прошло — пост будет опубликован сразу.");
      }
    }

    console.log("📤 Отправка поста...");
    await sendMessage(text, imagePath);
    console.log("✅ Публикация успешно завершена.");
  } catch (err) {
    console.error("❌ Ошибка:", err.message);
  }
})();


// import { readNextPost, markAsPublished } from './fileManager.js';
// import { sendTelegramPost } from './telegram.js';
// import { logInfo, logError } from './logger.js';
// import { scheduleJob } from './scheduler.js';
// import config from '../config.json' assert { type: 'json' };

// export class AutoPoster {
//   async postNext() {
//     try {
//       const post = await readNextPost();
//       if (!post) return logInfo('No new posts to publish.');
      
//       await sendTelegramPost(post);
//       await markAsPublished(post.filename);
//       logInfo(`✅ Posted: ${post.filename}`);
//     } catch (err) {
//       logError(err.message);
//     }
//   }

//   startScheduler() {
//     scheduleJob(config.schedule, async () => {
//       await this.postNext();
//     });
//   }
// }

