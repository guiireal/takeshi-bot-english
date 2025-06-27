const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-video-from-buffer",
  description: "Example of how to send a video from a buffer",
  commands: ["send-video-from-buffer"],
  usage: `${PREFIX}send-video-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, sendVideoFromBuffer, userJid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("I'm going to send a video from a local file buffer");

    await delay(3000);

    const videoBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await sendVideoFromBuffer(
      videoBuffer,
      "Here is the video from the local buffer"
    );

    await delay(3000);

    await sendReply("Now I'm going to send a video from a URL buffer");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await sendVideoFromBuffer(
      urlBuffer,
      "Here is the video from the URL buffer"
    );

    await delay(3000);

    await sendReply("You can also send video buffers without a caption");

    await delay(3000);

    await sendVideoFromBuffer(videoBuffer);

    await delay(3000);

    await sendReply("Also video buffers with caption, mentioning the user:");

    await delay(3000);

    await sendVideoFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
      ),
      `Here's the video you requested @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "To send videos from a buffer, use the function sendVideoFromBuffer(url, caption, [mentions], quoted).\n\n" +
        "This is useful when you have videos hosted online or obtained from APIs."
    );
  },
};
