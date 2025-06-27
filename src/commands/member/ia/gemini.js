const { PREFIX } = require(`${BASE_DIR}/config`);
const { gemini } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "gemini",
  description: "Use Google Gemini artificial intelligence!",
  commands: ["gemini", "takeshi"],
  usage: `${PREFIX}gemini how many sticks does it take to make a canoe?`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError(
        "You need to tell me what I should respond!"
      );
    }

    await sendWaitReply();

    const responseText = await gemini(text);

    await sendSuccessReply(responseText);
  },
};
