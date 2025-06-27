const { PREFIX } = require(`${BASE_DIR}/config`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "close",
  description: "Closes the group.",
  commands: ["close", "close-group"],
  usage: `${PREFIX}close`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendSuccessReply, sendErrorReply }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "announcement");
      await sendSuccessReply("Group closed successfully!");
    } catch (error) {
      await sendErrorReply(
        "To close the group, I need to be an administrator of it!"
      );
      errorLog(
        `An error occurred while closing the group! Cause: ${JSON.stringify(
          error,
          null,
          2
        )}`
      );
    }
  },
};
