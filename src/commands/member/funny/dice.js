/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { delay } = require("baileys");

const { getRandomNumber } = require(`${BASE_DIR}/utils`);

const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);
const path = require("node:path");

module.exports = {
  name: "dice",
  description: "Roll a dice from 1 to 6 and try to guess the number to win!",
  commands: ["dice"],
  usage: `${PREFIX}dice number`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendReply,
    sendStickerFromURL,
    sendReact,
    webMessage,
  }) => {
    const number = parseInt(args[0]);

    if (!number || number < 1 || number > 6) {
      throw new DangerError(
        `Please choose a number between 1 and 6!\nExample: ${PREFIX}dice 3`
      );
    }

    await sendWaitReply("🎲 Rolling the dice...");

    const result = getRandomNumber(1, 6);

    const pushName = webMessage?.pushName || "User";

    await sendStickerFromURL(
      path.resolve(ASSETS_DIR, "stickers", "dice", `${result}.webp`)
    );

    await delay(2000);

    if (number === result) {
      await sendReact("🏆");
      await sendReply(
        `🎉 *${pushName} WON!* You bet on number *${number}* and the dice landed on *${result}*! 🍀`
      );
    } else {
      await sendReact("😭");
      await sendReply(
        `💥 *${pushName} LOST...* You bet on *${number}* but the dice landed on *${result}*! Try again.`
      );
    }
  },
};
