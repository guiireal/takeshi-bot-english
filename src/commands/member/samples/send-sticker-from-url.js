const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-sticker-from-url",
  description: "Example of how to send a sticker from a URL",
  commands: ["send-sticker-from-url"],
  usage: `${PREFIX}send-sticker-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendStickerFromURL, sendReact }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("I'm going to send a sticker from a URL");

    await delay(3000);

    await sendStickerFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-sticker.webp"
    );

    await delay(3000);

    await sendReply(
      "To send stickers from a URL, use the function sendStickerFromURL(url, quoted).\n\n" +
        "This is useful when you have stickers hosted online or obtained from APIs."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tip:** Make sure the URL points to a valid .webp file to ensure compatibility."
    );
  },
};
