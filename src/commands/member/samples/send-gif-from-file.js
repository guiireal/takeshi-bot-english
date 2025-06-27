const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-gif-from-file",
  description: "Example of how to send gifs from local files",
  commands: ["send-gif-from-file"],
  usage: `${PREFIX}send-gif-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromFile, sendReact, userJid }) => {
    await sendReact("🎬");

    await delay(3000);

    await sendReply("I'm going to send gifs from local files");

    await delay(3000);

    await sendGifFromFile(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));

    await delay(3000);

    await sendReply("Now with caption:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "This is a gif with a caption!"
    );

    await delay(3000);

    await sendReply("Now mentioning you:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      `Hello @${userJid.split("@")[0]}! This gif is for you!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("And now without replying to your message:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Gif without reply/mention in the message",
      null,
      false
    );

    await delay(3000);

    await sendReply(
      "To send images from a file, use the function sendGifFromFile(url, caption, [mentions], quoted).\n\n" +
        "This is useful when you have gifs stored locally on the server."
    );
  },
};
