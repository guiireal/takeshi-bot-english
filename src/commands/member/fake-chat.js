/**
 * Developed by: Mkg
 * Refactored by: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "fake-chat",
  description: "Create a fake quote mentioning a user",
  commands: ["fake-chat", "fq", "fake-quote", "f-quote", "fk"],
  usage: `${PREFIX}fake-chat @user / quoted text / message to be sent`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, socket, args }) => {
    if (args.length !== 3) {
      throw new InvalidParameterError(
        `Incorrect command usage. Example: ${PREFIX}fake-chat @user / quoted text / message to be sent`
      );
    }

    const quotedText = args[1];
    const responseText = args[2];

    const mentionedJid = toUserJid(args[0]);

    if (quotedText.length < 2) {
      throw new InvalidParameterError(
        "The quoted text must be at least 2 characters long."
      );
    }

    if (responseText.length < 2) {
      throw new InvalidParameterError(
        "The response message must be at least 2 characters long."
      );
    }

    const fakeQuoted = {
      key: {
        fromMe: false,
        participant: mentionedJid,
        remoteJid,
      },
      message: {
        extendedTextMessage: {
          text: quotedText,
          contextInfo: {
            mentionedJid: [mentionedJid],
          },
        },
      },
    };

    await socket.sendMessage(
      remoteJid,
      { text: responseText },
      { quoted: fakeQuoted }
    );
  },
};
