/**
 * Image upload and link generation services.
 *
 * @author Dev Gui
 */
const FormData = require("form-data");
const axios = require("axios");

exports.upload = async (imageBuffer, filename) => {
  try {
    if (!Buffer.isBuffer(imageBuffer)) {
      throw new Error("The first parameter must be a valid Buffer!");
    }

    if (typeof filename !== "string" || filename.trim() === "") {
      throw new Error("The second parameter must be the filename!");
    }

    if (imageBuffer.length === 0) {
      throw new new Error("The image buffer is empty!")();
    }

    const API_KEY = "6d207e02198a847aa98d0a2a901485a5";
    const API_URL = "https://freeimage.host/api/1/upload";

    const formData = new FormData();
    formData.append("key", API_KEY);
    formData.append("action", "upload");
    formData.append("source", imageBuffer, {
      filename: filename,
      contentType: "image/jpeg",
    });
    formData.append("format", "json");

    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const result = response.data;

    if (result.status_code !== 200) {
      throw new Error(`API Error: ${result.error?.message || "Unknown error"}`);
    }

    return result.image.url;
  } catch (error) {
    console.error("Image upload error:", error.message);

    if (error.response) {
      return {
        success: false,
        error: `HTTP Error ${error.response.status}: ${error.response.statusText}`,
      };
    } else if (error.request) {
      return {
        success: false,
        error: "Network error: Could not connect to the server",
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
};
