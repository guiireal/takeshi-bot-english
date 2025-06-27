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
  name: "gray",
  description:
    "Generate an edit that converts the image you send to black and white",
  commands: ["gray", "blanco-y-negro", "bn"],
  usage: `${PREFIX}gray (tag the image) or ${PREFIX}gray (reply to the image)`,
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
      const outputPath = await ffmpeg.convertToGrayscale(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error applying black and white effect");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
