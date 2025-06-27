/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "schedule-message",
  description: "Schedules a message to be sent after a defined time.",
  commands: ["schedule", "schedule-message"],
  usage: `${PREFIX}schedule-message message / time
 
Example: ${PREFIX}schedule-message Meeting tomorrow / 10m`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendErrorReply, sendSuccessReply, sendText }) => {
    if (args.length !== 2) {
      return await sendErrorReply(
        `Incorrect format. Use: ${PREFIX}schedule-message message / time
        
Example: ${PREFIX}schedule-message Meeting tomorrow / 10m`
      );
    }

    const rawTime = args[1].trim();

    const message = args[0].trim();

    let timeInMs = 0;

    if (/^\d+s$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 1000;
    } else if (/^\d+m$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 60 * 1000;
    } else if (/^\d+h$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 60 * 60 * 1000;
    } else {
      return await sendErrorReply(
        `Invalid time format.
Use:\n• 10s for 10 seconds\n• 5m for 5 minutes\n• 2h for 2 hours`
      );
    }

    if (!message || message.trim() === "" || isNaN(timeInMs) || timeInMs <= 0) {
      return await sendErrorReply(
        "Invalid message or time not specified correctly."
      );
    }

    await sendSuccessReply(`⌚ Message scheduled for ${rawTime} from now...`);

    setTimeout(async () => {
      await sendText(`⏰ *Scheduled message:*\n\n${message}`);
    }, timeInMs);
  },
};
