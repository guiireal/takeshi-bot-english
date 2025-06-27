const { DEFAULT_PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const path = require("node:path");
const fs = require("node:fs");
const ffmpeg = require("fluent-ffmpeg");
const { getRandomName } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "reveal",
  description: "Reveals a one-time view image or video",
  commands: ["reveal", "rv"],
  usage: `${DEFAULT_PREFIX}reveal (tag the image/video) or ${DEFAULT_PREFIX}reveal (reply to the image/video).`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    sendVideoFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "You need to tag an image/video or reply to an image/video to reveal it!"
      );
    }

    await sendWaitReact();

    const mediaCaption =
      webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
        isImage ? "imageMessage" : "videoMessage"
      ]?.caption || `Here's your revealed ${isImage ? "image" : "video"}!`;

    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomName()}.${isImage ? "jpg" : "mp4"}`
    );

    let inputPath;

    try {
      if (isImage) {
        inputPath = await downloadImage(webMessage, "input");

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .outputOptions("-q:v 2")
            .on("end", async () => {
              await sendImageFromFile(outputPath, mediaCaption);
              await sendSuccessReact();
              resolve();
            })
            .on("error", (err) => {
              console.error("FFmpeg Error:", err);
              reject(err);
            })
            .save(outputPath);
        });
      } else if (isVideo) {
        inputPath = await downloadVideo(webMessage, "input");

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .outputOptions("-c copy")
            .on("end", async () => {
              await sendVideoFromFile(outputPath, mediaCaption);
              await sendSuccessReact();
              resolve();
            })
            .on("error", (err) => {
              console.error("FFmpeg Error:", err);
              reject(err);
            })
            .save(outputPath);
        });
      }
    } catch (error) {
      console.error("General error:", error);
      throw new Error(
        "An error occurred while processing the media. Please try again."
      );
    } finally {
      const cleanFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (cleanError) {
            console.error("Error cleaning file:", cleanError);
          }
        }
      };

      cleanFile(inputPath);
      cleanFile(outputPath);
    }
  },
};
