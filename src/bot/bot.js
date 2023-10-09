const bot = require("./setup");


const owner = process.env.OWNER_ID;
const start_message = process.env.START_MESSAGE;


bot.command("start", async (ctx) => {
  try {
    await bot.api.sendMessage(ctx.chat.id, start_message, { parse_mode: "HTML" });
  } catch (error) {
    console.log("Error Occured", error.message);
  }
});


bot.on("message", async (ctx) => {
  try {
    if (ctx.chat.id == owner) {
      if (ctx.message.reply_to_message && ctx.message.reply_to_message.forward_from && ctx.message.reply_to_message.forward_from.id) {
        await bot.api.copyMessage(ctx.message.reply_to_message.forward_from.id, ctx.chat.id, ctx.message.message_id);
      } else {
        await bot.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
      }
    } else {
      await bot.api.forwardMessage(owner, ctx.chat.id, ctx.message.message_id);
    }
  } catch (error) {
    console.log("Error Occured", error.message);
  }
});
