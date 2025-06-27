const { PREFIX } = require(`${BASE_DIR}/config`);
const { ttp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "ttp",
  description: "Create text stickers.",
  commands: ["ttp"],
  usage: `${PREFIX}ttp test`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "You need to enter the text you want to convert to a sticker."
      );
    }

    await sendWaitReact();

    const url = await ttp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
