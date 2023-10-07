const { Bot, GrammyError, HttpError } = require("grammy");
require("dotenv").config();


if (!process.env.BOT_TOKEN) {
  console.log(`Invalid BOT_TOKEN`);
  return;
}

if (!process.env.OWNER_ID) {
  console.log(`Invalid OWNER_ID`);
  return;
}

if (!process.env.START_MESSAGE) {
  console.log(`Invalid START_MESSAGE`);
  return;
}


const bot = new Bot(process.env.BOT_TOKEN);


bot.catch((error) => {
  console.log(`Error while handling update: ${error.ctx.update.update_id}`);
  if (error.error instanceof GrammyError) {
    console.log("Error in request:", error.error.description);
  } else if (error.error instanceof HttpError) {
    console.log("Could not contact Telegram:", error.error);
  } else {
    console.log("Unknown error:", error.error);
  }
});


bot.use(async (ctx, next) => {
  try {
    if (ctx.chat.type != "private") return;
    await next();
  } catch (error) {
    console.log("Error Occured", error.message);
  }
});


module.exports = bot;
