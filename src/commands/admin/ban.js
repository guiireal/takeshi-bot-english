const { OWNER_NUMBER } = require("../../config");

const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError, InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "ban",
  description: "Removes a member from the group",
  commands: ["ban", "kick"],
  usage: `${PREFIX}ban @tag_member 
  
or 

${PREFIX}ban (mentioning a message)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError("You need to mention or tag a member!");
    }

    const memberToRemoveJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

    if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
      throw new InvalidParameterError("Invalid number!");
    }

    if (memberToRemoveJid === userJid) {
      throw new DangerError("You cannot remove yourself!");
    }

    if (memberToRemoveNumber === OWNER_NUMBER) {
      throw new DangerError("You cannot remove the bot owner!");
    }

    const botJid = toUserJid(BOT_NUMBER);

    if (memberToRemoveJid === botJid) {
      throw new DangerError("You cannot remove me!");
    }

    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveJid],
      "remove"
    );

    await sendSuccessReact();

    await sendReply("Member removed successfully!");
  },
};
