const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "stable-diffusion-turbo",
  description: "Create an image using Stable Diffusion Turbo AI",
  commands: [
    "stable-diffusion-turbo",
    "stable-dif-turbo",
    "stable-dif",
    "stable-diff-turbo",
    "stable-diff",
    "stable-diffusion",
    "stable-difusion-turbo",
    "stable-difusion",
  ],
  usage: `${PREFIX}stable-diffusion-turbo description`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendImageFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "You need to provide a description for the image."
      );
    }

    await sendWaitReply("generating image...");

    const data = await imageAI("stable-diffusion-turbo", fullArgs);

    if (!data?.image) {
      return sendWarningReply(
        "It was not possible to generate the image! Try again later."
      );
    }

    await sendSuccessReact();
    await sendImageFromURL(data.image);
  },
};
