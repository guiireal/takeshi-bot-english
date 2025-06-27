const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-reaction",
  description: "Example of different reaction types (emojis)",
  commands: ["send-reaction"],
  usage: `${PREFIX}send-reaction`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendSuccessReact,
    sendErrorReact,
    sendWarningReact,
    sendWaitReact,
  }) => {
    await sendReply(
      "I'm going to demonstrate the different reaction types available:"
    );

    await delay(2000);

    await sendReply("Custom reaction:");
    await sendReact("🎉");

    await delay(2000);

    await sendReply("Success reaction:");
    await sendSuccessReact();

    await delay(2000);

    await sendReply("Error reaction:");
    await sendErrorReact();

    await delay(2000);

    await sendReply("Warning reaction:");
    await sendWarningReact();

    await delay(2000);

    await sendReply("Wait reaction:");
    await sendWaitReact();

    await delay(2000);

    await sendReply("Testing a sequence of reactions:");

    await sendReact("1️⃣");
    await delay(1000);
    await sendReact("2️⃣");
    await delay(1000);
    await sendReact("3️⃣");
    await delay(1000);
    await sendReact("🎯");

    await delay(2000);

    await sendReply(
      "🎭 *Available Reaction Types:*\n\n" +
        "• `sendReact(emoji)` - Custom reaction\n" +
        "• `sendSuccessReact()` - Success reaction (✅)\n" +
        "• `sendErrorReact()` - Error reaction (❌)\n" +
        "• `sendWarningReact()` - Warning reaction (⚠️)\n" +
        "• `sendWaitReact()` - Wait reaction (⏳)\n\n" +
        "Reactions are useful for providing quick feedback to the user!"
    );
  },
};
