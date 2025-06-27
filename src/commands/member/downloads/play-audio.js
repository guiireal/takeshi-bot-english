const { PREFIX } = require(`${BASE_DIR}/config`);
const { play } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "play-audio",
  description: "Download music",
  commands: ["play-audio", "play", "pa"],
  usage: `${PREFIX}play-audio MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendAudioFromURL,
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
        `You cannot use links to download music! Use ${PREFIX}yt-mp3 link`
      );
    }

    await sendWaitReact();

    try {
      const data = await play("audio", fullArgs);

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

      await sendAudioFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};
