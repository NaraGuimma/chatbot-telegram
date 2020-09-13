const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');



const token = 'YOUR TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;


  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let responseText = dfResponse.text;

  if (dfResponse.intent === 'Estudo JavaScript') {
    responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.javascript.stringValue);
  }

  bot.sendMessage(chatId, responseText);
});