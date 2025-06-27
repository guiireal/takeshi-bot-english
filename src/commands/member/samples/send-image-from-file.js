const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-image-from-file",
  description: "Example of how to send an image from a local file",
  commands: ["send-image-from-file"],
  usage: `${PREFIX}send-image-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromFile, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("I'm going to send an image from a local file");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg"),
      "This is an optional caption for the image"
    );

    await delay(3000);

    await sendReply("You can also send images without a caption:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await delay(3000);

    await sendReply("Or use other images from the project:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      "Takeshi Bot Logo!"
    );

    await delay(3000);

    await sendReply(
      "Now I'm going to send an image from a file mentioning you:"
    );

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `Takeshi Bot Logo for you @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "To send images from a file, use the function sendImageFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "This is useful when you have images stored locally on the server."
    );
  },
};
