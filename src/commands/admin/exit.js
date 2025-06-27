const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateExitGroup,
  deactivateExitGroup,
  isActiveExitGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "exit",
  description:
    "Activates/deactivates the function of sending messages when someone leaves the group.",
  commands: ["exit"],
  usage: `${PREFIX}exit (1/0)`,
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

    const exit = args[0] === "1";
    const notExit = args[0] === "0";

    if (!exit && !notExit) {
      throw new InvalidParameterError(
        "You need to write 1 or 0 (activate or deactivate)!"
      );
    }

    const hasActive = exit && isActiveExitGroup(remoteJid);
    const hasInactive = notExit && !isActiveExitGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Exit function is already ${exit ? "activated" : "deactivated"}!`
      );
    }

    if (exit) {
      activateExitGroup(remoteJid);
    } else {
      deactivateExitGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = exit ? "activated" : "deactivated";

    await sendReply(`Exit message sending function ${context} successfully!`);
  },
};
