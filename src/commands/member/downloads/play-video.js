const { PREFIX } = require(`${BASE_DIR}/config`);
const { play } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "play-video",
  description: "Download videos",
  commands: ["play-video", "pv"],
  usage: `${PREFIX}play-video MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendVideoFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError(
        "You need to tell me what you want to search for!"
      );
    }

    if (fullArgs.includes("http://") || fullArgs.includes("https://")) {
      throw new InvalidParameterError(
        `You cannot use links to download videos! Use ${PREFIX}yt-mp4 link`
      );
    }

    await sendWaitReact();

    try {
      const data = await play("video", fullArgs);

      if (!data) {
        await sendErrorReply("No results found!");
        return;
      }

      await sendSuccessReact();

      await sendImageFromURL(
        data.thumbnail,
        `*Title*: ${data.title}
        
*Description*: ${data.description}
*Duration in seconds*: ${data.total_duration_in_seconds}
*Channel*: ${data.channel.name}`
      );

      await sendVideoFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(JSON.stringify(error.message));
    }
  },
};
