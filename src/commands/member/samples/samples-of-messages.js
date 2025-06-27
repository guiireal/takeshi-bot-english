const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "samples-of-messages",
  description: "List all available message sending examples for developers",
  commands: ["samples-of-messages", "sample-of-messages"],
  usage: `${PREFIX}samples-of-messages`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("📚");

    await delay(2000);

    await sendReply(
      "*📚 AVAILABLE EXAMPLES*\n\n" +
        "Use the commands below to see practical examples of how to use my commands:"
    );

    await delay(2000);

    await sendReply(
      "*🔊 AUDIO:*\n" +
        `• \`${PREFIX}send-audio-from-file\` - Send audio from local file\n` +
        `• \`${PREFIX}send-audio-from-url\` - Send audio from URL\n` +
        `• \`${PREFIX}send-audio-from-buffer\` - Send audio from buffer`
    );

    await delay(2000);

    await sendReply(
      "*🖼️ IMAGE:*\n" +
        `• \`${PREFIX}send-image-from-file\` - Send image from local file\n` +
        `• \`${PREFIX}send-image-from-url\` - Send image from URL\n` +
        `• \`${PREFIX}send-image-from-buffer\` - Send image from buffer`
    );

    await delay(2000);

    await sendReply(
      "*🎬 VIDEO:*\n" +
        `• \`${PREFIX}send-video-from-file\` - Send video from local file\n` +
        `• \`${PREFIX}send-video-from-url\` - Send video from URL\n` +
        `• \`${PREFIX}send-video-from-buffer\` - Send video from buffer`
    );

    await delay(2000);

    await sendReply(
      "*🎞️ GIF:*\n" +
        `• \`${PREFIX}send-gif-from-file\` - Send GIF from local file\n` +
        `• \`${PREFIX}send-gif-from-url\` - Send GIF from URL\n` +
        `• \`${PREFIX}send-gif-from-buffer\` - Send GIF from buffer`
    );

    await delay(2000);

    await sendReply(
      "*🏷️ STICKER:*\n" +
        `• \`${PREFIX}send-sticker-from-file\` - Send sticker from local file\n` +
        `• \`${PREFIX}send-sticker-from-url\` - Send sticker from URL\n` +
        `• \`${PREFIX}send-sticker-from-buffer\` - Send sticker from buffer`
    );

    await delay(2000);

    await sendReply(
      "*📊 POLL:*\n" +
        `• \`${PREFIX}send-poll\` - Send polls/votes (single or multiple selection)`
    );

    await delay(2000);

    await sendReply(
      "*📄 DOCUMENT:*\n" +
        `• \`${PREFIX}send-document-from-file\` - Send document from local file\n` +
        `• \`${PREFIX}send-document-from-url\` - Send document from URL\n` +
        `• \`${PREFIX}send-document-from-buffer\` - Send document from buffer`
    );

    await delay(2000);

    await sendReply(
      "*💬 TEXT AND REPLIES:*\n" +
        `• \`${PREFIX}send-text\` - Send text (with/without mention)\n` +
        `• \`${PREFIX}send-quoted\` - Reply to messages (with/without mention)\n` +
        `• \`${PREFIX}send-reaction\` - Send reactions (emojis)`
    );

    await delay(2000);

    await sendReply(
      "*📊 DATA AND METADATA:*\n" +
        `• \`${PREFIX}get-group-data\` - Get group data (name, owner, participants)\n` +
        `• \`${PREFIX}get-message-data\` - Get message metadata\n` +
        `• \`${PREFIX}group-functions\` - Group utility functions (demonstration)\n` +
        `• \`${PREFIX}raw-message\` - Get raw message data`
    );

    await delay(2000);

    await sendReply(
      "*🎯 HOW TO USE:*\n\n" +
        "1️⃣ Execute any command from the list above\n" +
        "2️⃣ Observe the practical behavior\n" +
        "3️⃣ Check the source code in `/src/commands/member/examples/`\n" +
        "4️⃣ Use it as a base for your own commands\n\n" +
        "*💡 Tip:* All examples include detailed explanations and use cases!"
    );

    await delay(2000);

    await sendReply(
      "*📝 AVAILABLE FUNCTIONS:*\n\n" +
        "Check the `@types/index.d.ts` file for complete documentation of all available functions with code examples!"
    );
  },
};
