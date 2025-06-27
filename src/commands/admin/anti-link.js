const { isActiveAntiLinkGroup } = require("../../utils/database");

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateAntiLinkGroup,
  deactivateAntiLinkGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "anti-link",
  description: "Enable/disable the anti-link feature in the group.",
  commands: ["anti-link"],
  usage: `${PREFIX}anti-link (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "You need to type 1 or 0 (turn on or off)!"
      );
    }

    const antiLinkOn = args[0] === "1";
    const antiLinkOff = args[0] === "0";

    if (!antiLinkOn && !antiLinkOff) {
      throw new InvalidParameterError(
        "You need to type 1 or 0 (turn on or off)!"
      );
    }

    const hasActive = antiLinkOn && isActiveAntiLinkGroup(remoteJid);
    const hasInactive = antiLinkOff && !isActiveAntiLinkGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `The anti-link feature is already ${
          antiLinkOn ? "enabled" : "disabled"
        }!`
      );
    }

    if (antiLinkOn) {
      activateAntiLinkGroup(remoteJid);
    } else {
      deactivateAntiLinkGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = antiLinkOn ? "enabled" : "disabled";

    await sendReply(`Anti-link feature ${context} successfully!`);
  },
};
