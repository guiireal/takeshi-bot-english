/**
 * Module responsible for uploading images to CatBox.
 * CatBox is a file hosting service.
 *
 * @author Dev Gui
 */
const { Catbox } = require("node-catbox");
const fs = require("node:fs");
const path = require("node:path");
const { TEMP_DIR } = require("../config");
const { getRandomName } = require("../utils");

exports.catBoxUpload = async (buffer) => {
  const catBox = new Catbox();

  const tempPath = path.resolve(TEMP_DIR, getRandomName("png"));

  fs.writeFileSync(tempPath, buffer);

  try {
    const response = await catBox.uploadFile({
      path: tempPath,
    });

    setTimeout(() => {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }, 1000 * 60 * 5);

    return response;
  } catch (error) {
    console.error("Error uploading to CatBox:", error);
    return null;
  }
};
