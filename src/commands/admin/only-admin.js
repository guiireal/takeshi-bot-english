const {
  activateOnlyAdmins,
  deactivateOnlyAdmins,
  isActiveOnlyAdmins,
} = require("../../utils/database");

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "only-admin",
  description: "Allows only administrators to use my commands.",
  commands: [
    "only-admin",
    "only-adm",
    "only-administrator",
    "only-administrators",
    "only-admins",
    "admin-only",
    "adm-only",
    "administrator-only",
    "administrators-only",
    "admins-only",
  ],
  usage: `${PREFIX}only-admin 1`,
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

    const onlyAdminOn = args[0] === "1";
    const onlyAdminOff = args[0] === "0";

    if (!onlyAdminOn && !onlyAdminOff) {
      throw new InvalidParameterError(
        "You need to type 1 or 0 (turn on or off)!"
      );
    }

    const hasActive = onlyAdminOn && isActiveOnlyAdmins(remoteJid);
    const hasInactive = onlyAdminOff && !isActiveOnlyAdmins(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `The admin-only commands feature is already ${
          onlyAdminOn ? "enabled" : "disabled"
        }!`
      );
    }

    if (onlyAdminOn) {
      activateOnlyAdmins(remoteJid);
    } else {
      deactivateOnlyAdmins(remoteJid);
    }

    await sendSuccessReact();

    const context = onlyAdminOn ? "enabled" : "disabled";

    await sendReply(`Admin-only commands feature ${context} successfully!`);
  },
};
