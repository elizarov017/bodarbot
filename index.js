const TeleBot = require('telebot');

const bot = new TeleBot("1761355313:AAG-bKTHdZOwe5Vj54xTLbMdy5BWrcUYNg4");

bot.on('text', (msg) => msg.reply.text(msg.text + "a"));

bot.start();