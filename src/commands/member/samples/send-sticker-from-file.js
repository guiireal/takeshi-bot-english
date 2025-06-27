const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-sticker-from-file",
  description: "Example of how to send a sticker from a local file",
  commands: ["send-sticker-from-file"],
  usage: `${PREFIX}send-sticker-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendStickerFromFile, sendReact }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("I'm going to send a sticker from a local file");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply("You can also use other stickers from the project:");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply(
      "To send stickers from a file, use the function sendStickerFromFile(filePath, quoted).\n\n" +
        "This is useful when you have stickers stored locally on the server."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tip:** The ideal format for stickers is .webp. Other formats may require conversion."
    );
  },
};
