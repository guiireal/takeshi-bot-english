const fs = require("node:fs");
const { upload } = require(`${BASE_DIR}/services/upload`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "generate-link",
  description: "Upload images",
  commands: ["generate-link", "up", "upload"],
  usage: `${PREFIX}generate-link (tag the image) or ${PREFIX}generate-link (reply to the image)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendReply,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError("You must tag or reply to an image!");
    }

    await sendWaitReact();

    const fileName = getRandomNumber(10_000, 99_999).toString();
    const filePath = await downloadImage(webMessage, fileName);

    const buffer = fs.readFileSync(filePath);

    const link = await upload(buffer, `${fileName}.png`);

    if (!link) {
      throw new Error("Could not upload the image, please try again later!");
    }

    await sendSuccessReact();

    await sendReply(`Here's your image link!\n\n- ${link}`);

    fs.unlinkSync(filePath);
  },
};
