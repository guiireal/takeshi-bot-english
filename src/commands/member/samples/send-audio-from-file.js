const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-audio-from-file",
  description: "Example of how to send audio through a file",
  commands: ["send-audio-from-file"],
  usage: `${PREFIX}send-audio-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromFile, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "I'm going to send an audio from a file, I'll send it as file playback."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3")
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a file, but as if I had recorded the audio."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a file, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "And finally, I'll send an audio from a file, as if I had recorded it, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true,
      false
    );
  },
};
