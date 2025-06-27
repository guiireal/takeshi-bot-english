const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-quoted",
  description:
    "Example of different reply types (success, error, warning, wait)",
  commands: ["send-quoted"],
  usage: `${PREFIX}send-quoted`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendSuccessReply,
    sendErrorReply,
    sendWarningReply,
    sendWaitReply,
    sendReact,
  }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply(
      "I'm going to demonstrate the different reply types available:"
    );

    await delay(3000);

    await sendSuccessReply("This is a success message! ✅");

    await delay(3000);

    await sendErrorReply("This is an error message! ❌");

    await delay(3000);

    await sendWarningReply("This is a warning message! ⚠️");

    await delay(3000);

    await sendWaitReply("This is a wait message! ⏳");

    await delay(3000);

    await sendReply("And this is a normal reply using sendReply");

    await delay(3000);

    await sendReply(
      "📋 *Available Reply Types:*\n\n" +
        "• `sendReply()` - Normal reply\n" +
        "• `sendSuccessReply()` - Success reply (with ✅)\n" +
        "• `sendErrorReply()` - Error reply (with ❌)\n" +
        "• `sendWarningReply()` - Warning reply (with ⚠️)\n" +
        "• `sendWaitReply()` - Wait reply (with ⏳)\n\n" +
        "Use each one according to the appropriate context!"
    );
  },
};
