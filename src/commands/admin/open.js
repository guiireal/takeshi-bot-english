const { PREFIX } = require(`${BASE_DIR}/config`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "open",
  description: "Opens the group.",
  commands: ["open", "open-group"],
  usage: `${PREFIX}open`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendSuccessReply, sendErrorReply }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "not_announcement");
      await sendSuccessReply("Group opened successfully!");
    } catch (error) {
      await sendErrorReply(
        "To open the group, I need to be an administrator of it!"
      );
      errorLog(
        `An error occurred while opening the group! Cause: ${JSON.stringify(
          error,
          null,
          2
        )}`
      );
    }
  },
};
