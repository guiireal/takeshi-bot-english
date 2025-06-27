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
  name: "blur",
  description: "Generate an edit that blurs the image you send",
  commands: ["blur", "desenfocar", "desenfoque"],
  usage: `${PREFIX}blur (tag the image) or ${PREFIX}blur (reply to the image)`,
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
      const outputPath = await ffmpeg.applyBlur(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error applying blur effect");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
