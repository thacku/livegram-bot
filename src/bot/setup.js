const { Bot } = require("grammy");
const { BOT_TOKEN, OWNER_ID, START_MESSAGE } = require("../config/config");


if (!process.env.BOT_TOKEN || !BOT_TOKEN) {
  console.error(`Invalid BOT_TOKEN`);
  return;
}

if (!process.env.OWNER_ID || !OWNER_ID) {
  console.error(`Invalid OWNER_ID`);
  return;
}

if (!process.env.START_MESSAGE || !START_MESSAGE) {
  console.error(`Invalid START_MESSAGE`);
  return;
}


const bot = new Bot(process.env.BOT_TOKEN);


bot.catch((error) => {
  console.error(`Error while handling update: ${error.ctx.update.update_id}`);
  if (error.error instanceof GrammyError) {
    console.error("Error in request:", error.error.description);
  } else if (error.error instanceof HttpError) {
    console.error("Could not contact Telegram:", error.error);
  } else {
    console.error("Unknown error:", error.error);
  }
});


bot.use(async (ctx, next) => {
  try {
    if (ctx.chat.type != "private") return;
    await bot.api.sendChatAction(ctx.chat.id, "typing");
    await next();
  } catch (error) {
    console.error("Error Occured", error.message);
  }
});


module.exports = bot;
