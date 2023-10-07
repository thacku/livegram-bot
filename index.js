const bot = require("./src/bot/setup");
require("./src/bot/bot");

(async () => {
  try {
    await bot.start({
      drop_pending_updates: true
    });
    console.log("Bot Started...");
  } catch (error) {
    console.log("Error Occured", error.message);
  }
})();
