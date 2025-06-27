const { PREFIX } = require(`${BASE_DIR}/config`);
const { deactivateGroup } = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "off",
  description: "Deactivates the bot in the group",
  commands: ["off"],
  usage: `${PREFIX}off`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, remoteJid, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("This command must be used within a group.");
    }

    deactivateGroup(remoteJid);

    await sendSuccessReply("Bot deactivated in the group!");
  },
};
