const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const fs = require("fs");
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { catBoxUpload } = require(`${BASE_DIR}/services/catbox`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "jail",
  description:
    "Generate an edit as if the person were in jail with the image you send",
  commands: ["carcel", "cadeia", "jail"],
  usage: `${PREFIX}jail (tag the image) or ${PREFIX}jail (reply to the image)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromURL,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "You need to tag an image or reply to an image!"
      );
    }

    await sendWaitReact();

    const filePath = await downloadImage(
      webMessage,
      `${getRandomNumber(10_000, 99_999)}`
    );

    const buffer = fs.readFileSync(filePath);
    const link = await catBoxUpload(buffer);
    const url = canvas("jail", link);

    await sendSuccessReact();

    await sendImageFromURL(url, "Image generated!");

    fs.unlinkSync(filePath);
  },
};
