/**
 * Enhanced by: Mkg
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ping",
  description: "Check if the bot is online, response time and uptime.",
  commands: ["ping", "pong"],
  usage: `${PREFIX}ping`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, startProcess, fullMessage }) => {
    const response = fullMessage.slice(1).startsWith("ping")
      ? "🏓 Pong!"
      : "🏓 Ping!";

    await sendReact("🏓");

    const uptime = process.uptime();

    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const ping = Date.now() - startProcess;

    await sendReply(`${response}

📶 Response speed: ${ping}ms
⏱️ Uptime: ${h}h ${m}m ${s}s`);
  },
};
