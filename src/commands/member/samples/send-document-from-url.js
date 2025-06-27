const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-document-from-url",
  description: "Example of how to send documents from URLs",
  commands: ["send-document-from-url"],
  usage: `${PREFIX}send-document-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendDocumentFromURL, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply("I'm going to send different types of documents from URLs");

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf",
      "application/pdf",
      "pdf-document-from-url.pdf"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt",
      "text/plain",
      "text-file-from-url.txt"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://raw.githubusercontent.com/guiireal/takeshi-bot-espanol/refs/heads/main/README.md",
      "text/markdown",
      "readme-example.md"
    );

    await delay(3000);

    await sendReply("You can also send documents with default mimetype:");

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf"
    );

    await delay(3000);

    await sendReply(
      "To send documents from a URL, use the sendDocumentFromURL(url, mimetype, fileName) function.\n\n" +
        "This is useful when you have documents hosted online or obtained from APIs."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tip:* Make sure the URL points to a valid and accessible file."
    );
  },
};
