const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const path = require("node:path");
const { ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "hug",
  description: "Hug a desired user.",
  commands: ["hug", "abrazo", "abrazos"],
  usage: `${PREFIX}hug @user`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendGifFromFile,
    sendErrorReply,
    userJid,
    replyJid,
    args,
    isReply,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError("You need to mention or tag a member!");
    }

    const targetJid = isReply ? replyJid : toUserJid(args[0]);

    if (!targetJid) {
      await sendErrorReply(
        "You must mention a user or reply to a message to hug."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "hug-darker-than-black.mp4"),
      `@${userNumber} gave a passionate hug to @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
