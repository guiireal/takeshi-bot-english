const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-poll",
  description: "Example of how to send polls/votes in groups",
  commands: ["send-poll"],
  usage: `${PREFIX}send-poll`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendPoll, sendReply, sendReact }) => {
    await sendReact("📊");

    await delay(2000);

    await sendPoll(
      "Single-choice poll: What's your preferred option?",
      [
        { optionName: "Option 1" },
        { optionName: "Option 2" },
        { optionName: "Option 3" },
      ],
      true
    );

    await delay(2000);

    await sendPoll(
      "Multiple-choice poll: What foods do you like?",
      [
        { optionName: "Pizza 🍕" },
        { optionName: "Hamburger 🍔" },
        { optionName: "Sushi 🍣" },
        { optionName: "Salad 🥗" },
        { optionName: "Ice Cream 🍦" },
      ],
      false
    );

    await delay(2000);

    await sendReply(
      "You can easily create your own polls using the function sendPoll(title, options, singleChoice)."
    );
  },
};
