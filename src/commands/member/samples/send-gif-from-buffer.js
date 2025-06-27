const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-gif-from-buffer",
  description: "Example of how to send gifs from buffers",
  commands: ["send-gif-from-buffer"],
  usage: `${PREFIX}send-gif-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromBuffer, sendReact, userJid }) => {
    await sendReact("💾");

    await delay(3000);

    await sendReply("I'm going to send gifs from buffers (local file and URL)");

    await delay(3000);

    const fileBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await sendGifFromBuffer(fileBuffer);

    await delay(3000);

    await sendReply("Now from a buffer obtained from a URL:");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await sendGifFromBuffer(urlBuffer, "GIF loaded from URL to buffer!");

    await delay(3000);

    await sendReply("With mention:");

    await delay(3000);

    await sendGifFromBuffer(
      fileBuffer,
      `@${userJid.split("@")[0]} this gif came from a buffer!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("And without replying to your message:");

    await delay(3000);

    await sendGifFromBuffer(
      fileBuffer,
      "GIF from buffer without reply",
      null,
      false
    );

    await delay(3000);

    await sendReply(
      "To send images from a file, use the function sendGifFromBuffer(buffer, caption, [mentions], quoted).\n\n" +
        "This is useful for dynamically generated or converted gifs!"
    );

    await delay(3000);

    await sendReply(
      "💾 *Advantages of buffers:*\n\n" +
        "• In-memory processing\n" +
        "• Format conversion\n" +
        "• Data manipulation\n" +
        "• Temporary cache\n\n" +
        "💡 *Tip:* Buffers are useful for dynamically generated or converted GIFs!"
    );
  },
};
