require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { WebhookClient } = require('discord.js');
const TELEGRAM_CHANNEL_ID = parseInt(process.env.TELEGRAM_CHANNEL_ID, 10);

const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const webhook = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });

telegramBot.on('message', async (msg) => {
    const sender = msg.from.first_name || '?';
    if (msg.chat.id === TELEGRAM_CHANNEL_ID) {
        try {
            await webhook.send(sender + ': ' + msg.text);
        } catch (e) {}
    }
});