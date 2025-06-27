const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "toimage",
  description: "Transform static stickers to image",
  commands: ["toimage", "toimg"],
  usage: `${PREFIX}toimage (tag the sticker) or ${PREFIX}toimage (reply to the sticker)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendImageFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("You need to send a sticker!");
    }

    await sendWaitReact();

    const inputPath = await downloadSticker(webMessage, "input");
    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomNumber(10_000, 99_999)}.png`
    );

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      await sendSuccessReact();

      await sendImageFromFile(outputPath);
    });
  },
};
