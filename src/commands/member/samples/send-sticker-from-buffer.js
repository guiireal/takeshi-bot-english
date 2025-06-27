const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-sticker-from-buffer",
  description: "Example of how to send a sticker from a buffer",
  commands: ["send-sticker-from-buffer"],
  usage: `${PREFIX}send-sticker-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, sendStickerFromBuffer }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("I'm going to send a sticker from a local file buffer");

    await delay(3000);

    const stickerBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await sendStickerFromBuffer(stickerBuffer);

    await delay(3000);

    await sendReply(
      "Now I'm going to send a sticker from a URL buffer and without quoting the message"
    );

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-sticker.webp"
    );

    await sendStickerFromBuffer(urlBuffer, false);

    await delay(3000);

    await sendReply(
      "To send stickers from a buffer, use the function sendStickerFromBuffer(buffer, quoted)."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tip:** Buffers are useful for dynamically generated stickers or those converted from other formats."
    );
  },
};
