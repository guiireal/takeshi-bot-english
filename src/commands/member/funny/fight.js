const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const path = require("node:path");
const { ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "fight",
  description: "Fight one on one or hit your enemy!",
  commands: ["fight"],
  usage: `${PREFIX}fight @user`,
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
        "You must mention a user or reply to a message to fight."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "sung-jin-woo-jinwoo.mp4"),
      `@${userNumber} had an intense fight with @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
