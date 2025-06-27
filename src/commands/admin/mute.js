/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const {
  checkIfMemberIsMuted,
  muteMember,
} = require(`${BASE_DIR}/utils/database`);
const {
  PREFIX,
  BOT_NUMBER,
  OWNER_NUMBER,
  OWNER_LID,
} = require(`${BASE_DIR}/config`);

const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "mute",
  description:
    "Mutes a user in the group (automatically deletes the user's messages).",
  commands: ["mute", "mutar"],
  usage: `${PREFIX}mute @user or (reply to the message of the user you want to mute)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    replyJid,
    userJid,
    sendErrorReply,
    sendSuccessReply,
    getGroupMetadata,
    socket,
    isGroupWithLid,
    isGroup,
  }) => {
    if (!isGroup) {
      throw new DangerError("This command can only be used in groups.");
    }

    if (!args.length && !replyJid) {
      throw new DangerError(
        `You need to mention a user or reply to the message of the user you want to mute.\n\nExample: ${PREFIX}mute @someone`
      );
    }

    const targetUserNumber = args.length
      ? onlyNumbers(args[0])
      : isGroupWithLid
      ? replyJid
      : onlyNumbers(replyJid);

    if ([OWNER_NUMBER, OWNER_LID].includes(targetUserNumber)) {
      throw new DangerError("You cannot mute the bot owner!");
    }

    const targetUserJid = isGroupWithLid
      ? targetUserNumber
      : toUserJid(targetUserNumber);

    if (targetUserJid === toUserJid(BOT_NUMBER)) {
      throw new DangerError("You cannot mute the bot.");
    }

    const [result] =
      replyJid && isGroupWithLid
        ? [{ jid: targetUserJid, lid: targetUserJid }]
        : await socket.onWhatsApp(targetUserNumber);

    if (result.jid === userJid) {
      throw new DangerError("You cannot mute yourself!");
    }

    const groupMetadata = await getGroupMetadata();

    const isUserInGroup = groupMetadata.participants.some(
      (participant) => participant.id === targetUserJid
    );

    if (!isUserInGroup) {
      return sendErrorReply(
        `The user @${targetUserNumber} is not in this group.`,
        [targetUserJid]
      );
    }

    const isTargetAdmin = groupMetadata.participants.some(
      (participant) => participant.id === targetUserJid && participant.admin
    );

    if (isTargetAdmin) {
      throw new DangerError("You cannot mute an administrator.");
    }

    if (checkIfMemberIsMuted(remoteJid, targetUserJid)) {
      return sendErrorReply(
        `The user @${targetUserNumber} is already muted in this group.`,
        [targetUserJid]
      );
    }

    muteMember(remoteJid, targetUserJid);

    await sendSuccessReply(
      `@${targetUserNumber} was muted successfully in this group!`,
      [targetUserJid]
    );
  },
};
