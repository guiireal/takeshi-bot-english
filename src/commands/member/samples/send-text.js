const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-text",
  description: "Example of how to send simple text messages and with mentions",
  commands: ["send-text"],
  usage: `${PREFIX}send-text`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendText, sendReact, userJid }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply("I'm going to demonstrate different ways to send text");

    await delay(3000);

    await sendText("This is a simple text message using sendText");

    await delay(3000);

    await sendText(
      `Hello! This message mentions you: @${userJid.split("@")[0]}`,
      [userJid]
    );

    await delay(3000);

    await sendReply("This is a reply using sendReply");

    await delay(3000);

    await sendText(
      "You can use *bold*, _italics_, ~strikethrough~ and ```code``` in the text!"
    );

    await delay(3000);

    await sendText(
      "📝 *Differences between functions:*\n\n" +
        "• `sendText()` - Sends simple text, with the option to mention users\n" +
        "• `sendReply()` - Sends text as a reply to the current message\n\n" +
        "Both support WhatsApp formatting!"
    );
  },
};
