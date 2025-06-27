const { PREFIX } = require(`${BASE_DIR}/config`);
const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "demote",
  description: "Demotes an administrator to regular member",
  commands: ["demote"],
  usage: `${PREFIX}demote @user`,
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
      return sendWarningReply("Please tag an administrator to demote them.");
    }

    const userId = args[0].replace("@", "") + "@s.whatsapp.net";

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "demote");
      await sendSuccessReply("User demoted successfully!");
    } catch (error) {
      errorLog(`Error demoting administrator: ${error.message}`);
      await sendErrorReply(
        "An error occurred while trying to demote the user. I need to be a group administrator to demote other administrators!"
      );
    }
  },
};
