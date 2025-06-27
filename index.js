/*
 * This index.js file is the same one that exists in "src/index.js", it's only here
 * to facilitate bot execution on some hosts.
 *
 * If you clicked here, it's because you probably already used a "case" bot with an "index.js" of 20 thousand lines...
 * I know, I understand you!
 * What's better? Getting an error in your "play", going to the "play.js" file and fixing it
 * or going to line 71023 of "index.js" and fixing it?
 *
 * Imagine if you paste your "case" wrong and forget to close
 * or open a parenthesis, a brace...
 * You start the bot, it gives you several errors and you don't know how to solve them...
 * Guess what you do?
 * You go back to the "index.js" you had before, right?
 *
 * That's what we don't want! We want clean, readable and easy-to-maintain code!
 * We create code for humans, not for machines, so the simpler, the better!
 *
 * From now on, let's change the word "case" to "command", ok? Let's go!
 *
 * ---------------- 🤖 WHERE ARE THE COMMANDS? 🤖 ----------------
 *
 * You'll find the commands inside the "src/commands" folder
 * Don't understand? Let's see!
 *
 * Open the "src" folder
 * Then, open the "commands" folder
 *
 * Notice that inside it there are 3 folders:
 *
 * - 📁 admin
 * - 📁 member
 * - 📁 owner
 *
 * Inside the "admin" folder there are administrative commands.
 * Inside the "member" folder there are commands for members.
 * Inside the "owner" folder there are commands that only the bot/group owner can access.
 *
 * Simple, right? Oh, one detail: you don't need to put an "if" to know if the command is admin or owner.
 * The bot already does it for you! You just need to place the command in the corresponding folder!
 *
 * ---------------- 🤖 WHERE DO I MODIFY THE MENU? 🤖 ----------------
 *
 * Open the "src" folder
 * Go to the "messages.js" file and edit the menu!
 * Just remember, do everything inside the backticks (`), since it's a template string.
 *
 * Don't understand?
 * Look:
 *
 * `Hello, how are you!` - This is CORRECT ✅
 *
 * Hello `how are you?` - This is INCORRECT (notice that "Hello" is outside the quotes) ❌
 *
 * ---------------- 🤖 HOW DO I CHANGE THE BOT'S PHOTO? 🤖 ----------------
 *
 * Open the "assets" folder
 * Then, open the "images" folder
 * Replace the "takeshi-bot.png" image with another one of your preference!
 * Just don't forget to keep the name "takeshi-bot.png"
 *
 * ---------------- 🚀 IMPORTANT 🚀 ----------------
 *
 * Read the complete tutorial at: https://github.com/guiireal/takeshi-bot-english
 *
 * Don't skip steps! Read it completely, as it's very important for you to understand how the bot works!
 *
 * By: Dev Gui
 *
 * Don't modify anything below, unless you know what you're doing!
 */
const { connect } = require("./src/connection");
const { load } = require("./src/loader");
const { badMacHandler } = require("./src/utils/badMacHandler");
const {
  successLog,
  errorLog,
  warningLog,
  bannerLog,
  infoLog,
} = require("./src/utils/logger");

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) {
    return;
  }

  errorLog(`Critical uncaught error: ${error.message}`);
  errorLog(error.stack);

  if (
    !error.message.includes("ENOTFOUND") &&
    !error.message.includes("timeout")
  ) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }

  errorLog(`Unhandled rejected promise:`, reason);
});

async function startBot() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.setMaxListeners(1500);

    bannerLog();
    infoLog("Starting my internal components...");

    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(
        `BadMacHandler statistics: ${stats.errorCount}/${stats.maxRetries} errors`
      );
    }

    const socket = await connect();

    load(socket);

    successLog("✅ Bot started successfully!");

    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(
          `BadMacHandler statistics: ${currentStats.errorCount}/${currentStats.maxRetries} errors`
        );
      }
    }, 300_000);
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      warningLog("Bad MAC error during initialization, trying again...");

      setTimeout(() => {
        startBot();
      }, 5000);
      return;
    }

    errorLog(`Error starting bot: ${error.message}`);
    errorLog(error.stack);
    process.exit(1);
  }
}

startBot();
