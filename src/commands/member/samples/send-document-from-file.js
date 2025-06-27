const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-document-from-file",
  description: "Example of how to send documents from local files",
  commands: ["send-document-from-file"],
  usage: `${PREFIX}send-document-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendDocumentFromFile, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "I'm going to send different types of documents from local files"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf"),
      "application/pdf",
      "document-example.pdf"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-text.txt"),
      "text/plain",
      "text-file-example.txt"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.txt"),
      "text/plain",
      "another-document.txt"
    );

    await delay(3000);

    await sendReply("You can also send documents with default mimetype:");

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await delay(3000);

    await sendReply(
      "To send documents from a file, use the sendDocumentFromFile(filePath, mimetype, fileName) function.\n\n" +
        "This is useful when you have documents stored locally on the server."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tip:* You can specify the mimetype for different types: PDF, TXT, DOC, XLS, etc."
    );
  },
};
