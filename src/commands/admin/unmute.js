/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const {
  checkIfMemberIsMuted,
  unmuteMember,
} = require(`${BASE_DIR}/utils/database`);
const { PREFIX } = require(`${BASE_DIR}/config`);

const { DangerError, WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "unmute",
  description: "Unmutes a group member",
  commands: ["unmute"],
  usage: `${PREFIX}unmute @user`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    remoteJid,
    sendSuccessReply,
    args,
    isGroup,
    isGroupWithLid,
    socket,
  }) => {
    if (!isGroup) {
      throw new DangerError("This command can only be used in groups.");
    }

    if (!args.length) {
      throw new DangerError(
        `You need to mention a user to unmute.\n\nExample: ${PREFIX}unmute @user`
      );
    }

    const targetUserNumber = onlyNumbers(args[0]);
    let targetUserJid = toUserJid(targetUserNumber);

    if (isGroupWithLid) {
      const [result] = await socket.onWhatsApp(targetUserNumber);
      targetUserJid = result?.lid;
    }

    if (!checkIfMemberIsMuted(remoteJid, targetUserJid)) {
      throw new WarningError("This user is not muted!");
    }

    unmuteMember(remoteJid, targetUserJid);

    await sendSuccessReply("User unmuted successfully!");
  },
};
