const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ia-sticker",
  description: "Create a sticker based on a description",
  commands: ["ia-sticker", "ia-fig"],
  usage: `${PREFIX}ia-sticker description`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendStickerFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "You need to provide a description for the image."
      );
    }

    await sendWaitReply("generating sticker...");

    const data = await imageAI("stable-diffusion-turbo", fullArgs);

    if (data.image) {
      await sendStickerFromURL(data.image);
      await sendSuccessReact();
    } else {
      await sendWarningReply(
        "It was not possible to generate the sticker. Try again later."
      );
    }
  },
};
