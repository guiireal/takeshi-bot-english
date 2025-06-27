const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-document-from-buffer",
  description: "Example of how to send documents from buffers",
  commands: ["send-document-from-buffer"],
  usage: `${PREFIX}send-document-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, socket, remoteJid, webMessage }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "I'm going to send documents from buffers (local file and URL)"
    );

    await delay(3000);

    const fileBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        mimetype: "application/pdf",
        fileName: "document-from-local-buffer.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply("Now I'm going to send a document from a URL buffer");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt"
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: urlBuffer,
        mimetype: "text/plain",
        fileName: "file-from-url-buffer.txt",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "You can also send buffer documents with default mimetype:"
    );

    await delay(3000);

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        fileName: "document-default-buffer.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "To send buffer documents, use socket.sendMessage() directly with the buffer.\n\n" +
        "This is useful when you have documents processed in memory or need to manipulate the file before sending."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tip:* Buffers are useful for dynamically generated documents or when you need to process the file before sending."
    );
  },
};
