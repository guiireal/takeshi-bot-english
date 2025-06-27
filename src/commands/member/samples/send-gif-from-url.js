const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-gif-from-url",
  description: "Example of how to send gifs from external URLs",
  commands: ["send-gif-from-url"],
  usage: `${PREFIX}send-gif-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromURL, sendReact, userJid }) => {
    await sendReact("🌐");

    await delay(3000);

    await sendReply("I'm going to send gifs from external URLs");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await delay(3000);

    await sendReply("Now with caption:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "GIF loaded from an external URL!"
    );

    await delay(3000);

    await sendReply("With mention:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      `Hello @${userJid.split("@")[0]}! Look how cool this gif is!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("And without replying to your message:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "GIF without reply",
      undefined,
      false
    );

    await delay(3000);

    await sendReply(
      "To send images from a file, use the function sendGifFromURL(url, caption, [mentions], quoted).\n\n" +
        "This is useful when you have images hosted online or obtained from APIs."
    );

    await delay(3000);

    await sendReply(
      "🌐 *Useful URLs for GIFs:*\n\n" +
        "• Giphy: giphy.com\n" +
        "• Tenor: tenor.com\n" +
        "• Online GIF APIs\n\n" +
        "💡 *Tip:* Make sure the URL points directly to the video file!"
    );
  },
};
