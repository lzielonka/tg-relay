require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { WebhookClient } = require('discord.js');
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHANNEL_ID = parseInt(process.env.TELEGRAM_CHANNEL_ID, 10);

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const webhook = new WebhookClient({ url: DISCORD_WEBHOOK_URL });

telegramBot.on('channel_post', async (telegramMsg) => {
    // const { chat, text, from } = telegramMsg;
    const { chat, text } = telegramMsg;
    if (chat.id === TELEGRAM_CHANNEL_ID) {
        try {
            await webhook.send(text);
        } catch (e) {}
    }
});