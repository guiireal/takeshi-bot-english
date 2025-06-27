const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateWelcomeGroup,
  deactivateWelcomeGroup,
  isActiveWelcomeGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "welcome",
  description: "Activates/deactivates the welcome function in the group.",
  commands: ["welcome", "welkom", "welkon"],
  usage: `${PREFIX}welcome (1/0)`,
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

    const welcome = args[0] === "1";
    const notWelcome = args[0] === "0";

    if (!welcome && !notWelcome) {
      throw new InvalidParameterError(
        "You need to write 1 or 0 (activate or deactivate)!"
      );
    }

    const hasActive = welcome && isActiveWelcomeGroup(remoteJid);
    const hasInactive = notWelcome && !isActiveWelcomeGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Welcome function is already ${welcome ? "activated" : "deactivated"}!`
      );
    }

    if (welcome) {
      activateWelcomeGroup(remoteJid);
    } else {
      deactivateWelcomeGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = welcome ? "activated" : "deactivated";

    await sendReply(`Welcome function ${context} successfully!`);
  },
};
