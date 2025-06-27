const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const {
  activateAutoResponderGroup,
  deactivateAutoResponderGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "auto-responder",
  description: "Activates/deactivates the auto-response function in the group.",
  commands: ["auto-responder"],
  usage: `${PREFIX}auto-responder (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "You need to write 1 or 0 (activate or deactivate)!"
      );
    }

    const autoResponder = args[0] === "1";
    const notAutoResponder = args[0] === "0";

    if (!autoResponder && !notAutoResponder) {
      throw new InvalidParameterError(
        "You need to write 1 or 0 (activate or deactivate)!"
      );
    }

    if (autoResponder) {
      activateAutoResponderGroup(remoteJid);
    } else {
      deactivateAutoResponderGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = autoResponder ? "activated" : "deactivated";

    await sendReply(`Auto-response function ${context} successfully!`);
  },
};
