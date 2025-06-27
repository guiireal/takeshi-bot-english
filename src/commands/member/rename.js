const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, DangerError } = require(`${BASE_DIR}/errors`);
const {
  isAnimatedSticker,
  processStaticSticker,
  processAnimatedSticker,
  addStickerMetadata,
} = require(`${BASE_DIR}/services/sticker`);
const { getRandomName } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "rename",
  description: "Add new metadata to the sticker.",
  commands: ["rename", "rn"],
  usage: `${PREFIX}rename pack / author (reply to a sticker)`,
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendStickerFromFile,
    args,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("You need to reply to a sticker!");
    }

    if (args.length !== 2) {
      throw new InvalidParameterError(
        "You need to provide the pack and author in the format: pack / author"
      );
    }

    const pack = args[0];
    const author = args[1];

    if (!pack || !author) {
      throw new InvalidParameterError(
        "You need to provide the pack and author in the format: pack / author"
      );
    }

    const minLength = 2;
    const maxLength = 50;

    if (pack.length < minLength || pack.length > maxLength) {
      throw new DangerError(
        `The pack must be between ${minLength} and ${maxLength} characters.`
      );
    }

    if (author.length < minLength || author.length > maxLength) {
      throw new DangerError(
        `The author must be between ${minLength} and ${maxLength} characters.`
      );
    }

    let finalStickerPath = null;

    await sendWaitReact();

    const inputPath = await downloadSticker(webMessage, getRandomName("webp"));

    try {
      const metadata = {
        username: pack,
        botName: author,
      };

      const isAnimated = await isAnimatedSticker(inputPath);

      if (isAnimated) {
        finalStickerPath = await processAnimatedSticker(
          inputPath,
          metadata,
          addStickerMetadata
        );
      } else {
        finalStickerPath = await processStaticSticker(
          inputPath,
          metadata,
          addStickerMetadata
        );
      }

      await sendSuccessReact();

      await sendStickerFromFile(finalStickerPath);
    } catch (error) {
      throw new Error(`Error renaming the sticker: ${error.message}`);
    } finally {
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }

      if (finalStickerPath && fs.existsSync(finalStickerPath)) {
        fs.unlinkSync(finalStickerPath);
      }
    }
  },
};
