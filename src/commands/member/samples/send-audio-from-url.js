const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-audio-from-url",
  description: "Example of how to send audio through a link/url",
  commands: ["send-audio-from-url"],
  usage: `${PREFIX}send-audio-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromURL, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "I'm going to send an audio from a link, I'll send it as file playback."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a link, but as if I had recorded the audio."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true
    );

    await delay(3000);

    await sendReply(
      "Now I'll send an audio from a link, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "And finally, I'll send an audio from a link, as if I had recorded it, but without quoting above your message."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true,
      false
    );
  },
};
