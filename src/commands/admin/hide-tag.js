const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "hide-tag",
  description: "This command will tag everyone in the group",
  commands: ["hide-tag", "to-tag"],
  usage: `${PREFIX}hidetag reason`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    const { participants } = await socket.groupMetadata(remoteJid);

    const mentions = participants.map(({ id }) => id);

    await sendReact("📢");

    await sendText(`📢 Tagging everyone!\n\n${fullArgs}`, mentions);
  },
};
