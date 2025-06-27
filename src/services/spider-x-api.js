/**
 * Communication functions
 * with the Spider X API.
 *
 * @author Dev Gui
 */
const axios = require("axios");

const { SPIDER_API_TOKEN, SPIDER_API_BASE_URL } = require("../config");

/**
 * Do not configure the Spider X API token here, configure it in: src/config.js
 */
const spiderAPITokenConfigured =
  SPIDER_API_TOKEN && SPIDER_API_TOKEN !== "your_token_here";

exports.spiderAPITokenConfigured = spiderAPITokenConfigured;

exports.play = async (type, search) => {
  if (!search) {
    throw new Error("You need to enter what you want to search for!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/play-${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.download = async (type, url) => {
  if (!url) {
    throw new Error(
      "You need to enter a YouTube URL of what you want to search for!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/${type}?url=${encodeURIComponent(
      url
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.gemini = async (text) => {
  if (!text) {
    throw new Error("You need to enter the text parameter!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gemini?api_key=${SPIDER_API_TOKEN}`,
    {
      text,
    }
  );

  return data.response;
};

exports.attp = async (text) => {
  if (!text) {
    throw new Error("You need to enter the text parameter!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  return `${SPIDER_API_BASE_URL}/stickers/attp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
};

exports.ttp = async (text) => {
  if (!text) {
    throw new Error("You need to enter the text parameter!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  return `${SPIDER_API_BASE_URL}/stickers/ttp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
};

exports.search = async (type, search) => {
  if (!search) {
    throw new Error("You need to enter the search parameter!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/search/${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.welcome = (title, description, imageURL) => {
  if (!title || !description || !imageURL) {
    throw new Error("You need to enter the title, description and image URL!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  return `${SPIDER_API_BASE_URL}/canvas/welcome?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
};

exports.exit = (title, description, imageURL) => {
  if (!title || !description || !imageURL) {
    throw new Error("You need to enter the title, description and image URL!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  return `${SPIDER_API_BASE_URL}/canvas/goodbye?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
};

exports.imageAI = async (type, description) => {
  if (!description) {
    throw new Error("You need to enter the image description!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  const paramSearch = type === "stable-diffusion-turbo" ? "search" : "text";

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/ai/${type}?${paramSearch}=${encodeURIComponent(
      description
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.canvas = (type, imageURL) => {
  if (!imageURL) {
    throw new Error("You need to enter the image URL!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Spider X API token not configured");
  }

  return `${SPIDER_API_BASE_URL}/canvas/${type}?image_url=${encodeURIComponent(
    imageURL
  )}&api_key=${SPIDER_API_TOKEN}`;
};
