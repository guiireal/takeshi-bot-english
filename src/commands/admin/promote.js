const { PREFIX } = require(`${BASE_DIR}/config`);
const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "promote",
  description: "Promotes a user to group administrator",
  commands: ["promote", "add-adm"],
  usage: `${PREFIX}promote @user`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    socket,
    sendWarningReply,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    if (!isGroup(remoteJid)) {
      return sendWarningReply("This command can only be used in a group!");
    }

    if (!args.length || !args[0]) {
      return sendWarningReply("Please tag a user to promote.");
    }

    const userId = args[0].replace("@", "") + "@s.whatsapp.net";

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "promote");
      await sendSuccessReply("User promoted successfully!");
    } catch (error) {
      errorLog(`Error promoting user: ${error.message}`);
      await sendErrorReply(
        "An error occurred while trying to promote the user. I need to be a group administrator to promote other users!"
      );
    }
  },
};
