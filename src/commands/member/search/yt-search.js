const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

const { search } = require(`${BASE_DIR}/services/spider-x-api`);

module.exports = {
  name: "yt-search",
  description: "Search YouTube",
  commands: ["yt-search", "Youtube"],
  usage: `${PREFIX}yt-search MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply }) => {
    if (fullArgs.length <= 1) {
      throw new InvalidParameterError(
        "You need to provide a search term for YouTube."
      );
    }

    const maxLength = 100;

    if (fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `The maximum search length is ${maxLength} characters.`
      );
    }

    const data = await search("youtube", fullArgs);

    if (!data) {
      throw new WarningError("No results could be found for the search.");
    }

    let text = "";

    for (const item of data) {
      text += `Title: *${item.title}*\n\n`;
      text += `Duration: ${item.duration}\n\n`;
      text += `Published on: ${item.published_at}\n\n`;
      text += `Views: ${item.views}\n\n`;
      text += `URL: ${item.url}\n\n-----\n\n`;
    }

    text = text.slice(0, -2);

    await sendSuccessReply(`*Search completed*

*Term*: ${fullArgs}
      
*Results*
${text}`);
  },
};
