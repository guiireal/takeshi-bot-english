const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "delete",
  description: "I delete messages",
  commands: ["delete", "d"],
  usage: `${PREFIX}delete (mention a message)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ deleteMessage, webMessage, remoteJid }) => {
    const { stanzaId, participant } =
      webMessage?.message?.extendedTextMessage?.contextInfo;

    if (!stanzaId || !participant) {
      throw new InvalidParameterError("You must mention a message to delete!");
    }

    await deleteMessage({
      remoteJid,
      fromMe: false,
      id: stanzaId,
      participant,
    });
  },
};
