/**
 * Developed by: MRX
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const Ffmpeg = require(`${BASE_DIR}/services/ffmpeg`);

module.exports = {
  name: "contrast",
  description:
    "Generate an edit that adjusts the contrast of the image you send",
  commands: ["contrast", "contraste", "contrastear", "hd", "to-hd"],
  usage: `${PREFIX}contrast (tag the image) or ${PREFIX}contrast (reply to the image)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "You need to tag an image or reply to an image!"
      );
    }

    await sendWaitReact();

    const filePath = await downloadImage(webMessage);

    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.adjustContrast(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error applying contrast effect");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
