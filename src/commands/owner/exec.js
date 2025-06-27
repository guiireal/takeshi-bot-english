/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { exec } = require("child_process");
const { isBotOwner } = require(`${BASE_DIR}/middlewares`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "exec",
  description: "Executes terminal commands directly from the bot.",
  commands: ["exec"],
  usage: `${PREFIX}exec command`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    fullArgs,
    sendSuccessReply,
    sendErrorReply,
    userJid,
    isLid,
  }) => {
    if (!isBotOwner({ userJid, isLid })) {
      throw new DangerError("Only the bot owner can use this command!");
    }

    if (!fullArgs) {
      throw new DangerError(`Correct usage: ${PREFIX}exec command`);
    }

    exec(fullArgs, (error, stdout) => {
      if (error) {
        return sendErrorReply(`Error executing: ${error.message}`);
      }

      const output = stdout || "Command executed with no output.";

      return sendSuccessReply(
        `Result:\n\`\`\`\n${output.trim().slice(0, 4000)}\n\`\`\``
      );
    });
  },
};
