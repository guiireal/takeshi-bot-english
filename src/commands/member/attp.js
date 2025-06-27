const { PREFIX } = require(`${BASE_DIR}/config`);
const { attp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "attp",
  description: "Create animated text stickers.",
  commands: ["attp"],
  usage: `${PREFIX}attp test`,
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

    const url = await attp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
