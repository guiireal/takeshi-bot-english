const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-video-from-file",
  description: "Example of how to send a video from a local file",
  commands: ["send-video-from-file"],
  usage: `${PREFIX}send-video-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendVideoFromFile, sendReact }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("I'm going to send a video from a local file");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "This is a sample video with a caption"
    );

    await delay(3000);

    await sendReply("You can also send videos without a caption:");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await delay(3000);

    await sendReply(
      "To send videos from a file, use the function sendVideoFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "This is useful when you have videos stored locally on the server."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tip:** Compatible formats include MP4, AVI, MOV, etc. WhatsApp automatically converts them if necessary."
    );
  },
};
