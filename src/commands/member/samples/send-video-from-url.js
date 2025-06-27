const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-video-from-url",
  description: "Example of how to send a video from a URL",
  commands: ["send-video-from-url"],
  usage: `${PREFIX}send-video-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendVideoFromURL, sendReact, userJid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("I'm going to send a video from a URL");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await delay(3000);

    await sendReply("Also send without quoting the user's message:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      null,
      false
    );

    await delay(3000);

    await sendReply("You can also send videos with a caption:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "Here's the video you asked for!"
    );

    await delay(3000);

    await sendReply("Also videos with caption, mentioning the user:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      `Here's the video you asked for @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "To send videos from a URL, use the function sendVideoFromURL(url, caption, [mentions], quoted).\n\n" +
        "This is useful when you have videos hosted online or obtained from APIs."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tip:** Make sure the URL points to a valid and accessible video file."
    );
  },
};
