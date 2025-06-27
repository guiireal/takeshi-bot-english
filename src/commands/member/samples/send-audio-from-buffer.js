const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const fs = require("node:fs");
const path = require("node:path");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-audio-from-buffer",
  description: "Example of how to send audio through a buffer",
  commands: ["send-audio-from-buffer"],
  usage: `${PREFIX}send-audio-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromBuffer, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "I'm going to send an audio from a buffer extracted from a URL, I'll send it as file playback."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      )
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a buffer extracted from a file, but as if I had recorded the audio."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      true
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a buffer extracted from a file, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "And finally, I'll send an audio from a buffer extracted from a URL, as if I had recorded it, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      ),
      true,
      false
    );
  },
};
