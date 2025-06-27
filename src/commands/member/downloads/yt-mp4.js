const { PREFIX } = require(`${BASE_DIR}/config`);
const { download } = require(`${BASE_DIR}/services/spider-x-api`);
const { WarningError } = require(`${BASE_DIR}/errors`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "yt-mp4",
  description: "Download YouTube videos through the link!",
  commands: ["yt-mp4", "youtube-mp4", "yt-video", "youtube-video", "mp4"],
  usage: `${PREFIX}yt-mp4 https://www.youtube.com/watch?v=mW8o_WDL91o`,
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
      throw new InvalidParameterError("You need to send a YouTube URL!");
    }

    await sendWaitReact();

    if (!fullArgs.includes("you")) {
      throw new WarningError("The link is not from YouTube!");
    }

    try {
      const data = await download("yt-mp4", fullArgs);

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
      await sendErrorReply(error.message);
    }
  },
};
