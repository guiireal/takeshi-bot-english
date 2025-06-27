const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "set-name",
  description: "Changes the group name and saves the old name",
  commands: ["set-name", "set-group-name", "mudar-nome-grupo", "nome-grupo"],
  usage: `${PREFIX}set-name new group name`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    fullArgs,
    remoteJid,
    socket,
    sendErrorReply,
    sendSuccessReply,
    sendWaitReply,
    isGroup,
  }) => {
    if (!isGroup) {
      throw new WarningError("This command can only be used in groups.");
    }

    if (!fullArgs) {
      throw new InvalidParameterError(
        "You need to provide a new name for the group!"
      );
    }

    const minLength = 3;
    const maxLength = 40;

    if (fullArgs.length < minLength || fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `The group name must be between ${minLength} and ${maxLength} characters!`
      );
    }

    try {
      await sendWaitReply("Changing group name...");

      const groupMetadata = await socket.groupMetadata(remoteJid);
      const oldName = groupMetadata.subject;

      await socket.groupUpdateSubject(remoteJid, fullArgs);

      await sendSuccessReply(
        `Group name changed successfully!\n\n*Old*: ${oldName}\n\n*New*: ${fullArgs}`
      );
    } catch (error) {
      errorLog("Error changing group name:", error);
      await sendErrorReply(
        "Failed to change group name. Check if I have administrator permission."
      );
    }
  },
};
