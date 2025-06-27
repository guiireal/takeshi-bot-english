const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-image-from-url",
  description: "Example of how to send an image from a URL",
  commands: ["send-image-from-url"],
  usage: `${PREFIX}send-image-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromURL, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("I'm going to send an image from a URL");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      "This is a caption for the image from the URL"
    );

    await delay(3000);

    await sendReply("You can also send URL images without a caption:");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await delay(3000);

    await sendReply("Now I'm going to send a URL image mentioning you:");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      `Takeshi Bot Logo for you ${userJid.split("@")[0]}!`,
      [userJid]
    );

    await sendReply(
      "To send images from a URL, use the function sendImageFromURL(url, caption, [mentions], quoted).\n\n" +
        "This is useful when you have images hosted online or obtained from APIs."
    );
  },
};
