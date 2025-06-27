const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-image-from-buffer",
  description: "Example of how to send an image from a buffer",
  commands: ["send-image-from-buffer"],
  usage: `${PREFIX}send-image-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromBuffer, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("I'm going to send an image from a local file buffer");

    await delay(3000);

    const imageBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await sendImageFromBuffer(
      imageBuffer,
      "This is an image from a local file buffer"
    );

    await delay(3000);

    await sendReply("Now I'm going to send an image from a URL buffer");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await sendImageFromBuffer(urlBuffer, "This is an image from a URL buffer");

    await delay(3000);

    await sendReply("You can also send buffer images without a caption");

    await delay(3000);

    await sendImageFromBuffer(urlBuffer);

    await delay(3000);

    await sendReply("Now I'm going to send a buffer image mentioning you:");

    await delay(3000);

    await sendImageFromBuffer(
      urlBuffer,
      `Here's the image @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "To send images from a buffer, use the function sendImageFromBuffer(buffer, caption, [mentions], quoted).\n\n" +
        "This is useful when you have images processed in memory or need to manipulate the image before sending."
    );
  },
};
