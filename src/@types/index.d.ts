declare global {
  /** Base path of the project, used for imports. */
  const BASE_DIR: string;

  /**
   * Properties and functions available in the object passed to the handle function
   * of each command. You can access them with destructuring:
   *
   * ```javascript
   * handle: async ({ args, sendReply, isImage }) => {
   *    // Your code here
   * }
   * ```
   */
  interface CommandHandleProps {
    /**
     * Arguments passed along with the command as an array, what separates
     * the arguments are the slashes / | or \
     * Example: ["arg1", "arg2"]
     */
    args: string[];

    /**
     * Name of the command that was executed
     */
    commandName: string;

    /**
     * Arguments passed along with the command as a single string.
     * Example: "arg1 / arg2"
     */
    fullArgs: string;

    /**
     * Full message including the command.
     */
    fullMessage: string;

    /**
     * Whether the message is an audio.
     */
    isAudio: boolean;

    /**
     * Whether the message came from a group.
     */
    isGroup: boolean;

    /**
     * Whether the message came from a group whose participants have LID.
     */
    isGroupWithLid: boolean;

    /**
     * Whether the message is an image.
     */
    isImage: boolean;

    /**
     * Whether the message is a reply to another message.
     */
    isReply: boolean;

    /**
     * Whether the message is a sticker.
     */
    isSticker: boolean;

    /**
     * Whether the message is a video.
     */
    isVideo: boolean;

    /**
     * Configured bot prefix.
     */
    prefix: string;

    /**
     * ID of the group/user receiving the message.
     */
    remoteJid: string;

    /**
     * ID of the message being replied to.
     */
    replyJid: string;

    /**
     * Baileys socket for advanced operations.
     */
    socket: any;

    /**
     * Timestamp when the command was started.
     */
    startProcess: number;

    /**
     * Command type by role, whether it's "admin", "owner" or "member".
     */
    type: string;

    /**
     * ID of the user sending the message.
     */
    userJid: string;

    /**
     * Detailed information of the WhatsApp message.
     */
    webMessage: any;

    /**
     * Deletes a message from a WhatsApp participant.
     * Must be a group admin to delete messages from other participants.
     *
     *  Example:
     * ```javascript
     * await deleteMessage(webMessage.key);
     * ```
     * @param key Identification key of the message to be deleted.
     */
    deleteMessage(key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
      participant: string;
    }): Promise<void>;

    /**
     * Downloads an audio from the current message.
     * @returns Promise with the audio path
     */
    downloadAudio(): Promise<string>;

    /**
     * Downloads an image from the current message.
     * @returns Promise with the image path
     */
    downloadImage(): Promise<string>;

    /**
     * Downloads a sticker from the current message.
     * @returns Promise with the sticker path
     */
    downloadSticker(): Promise<string>;

    /**
     * Downloads a video from the current message.
     * @returns Promise with the video path
     */
    downloadVideo(): Promise<string>;

    /**
     * Sends an audio from a file.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples" "sample-audio.mp3");
     * await sendAudioFromFile(filePath);
     * ```
     * @param filePath File path
     * @param asVoice Whether the audio should be sent as a voice message (true or false)
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendAudioFromFile(
      filePath: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Sends an audio from a file.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const { getBuffer } = require(`${BASE_DIR}/src/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples" "sample-audio.mp3"))
     * or
     * const buffer = await getBuffer("https://example.com/audio.mp3");
     * await sendAudioFromBuffer(filePath);
     * ```
     * @param buffer Audio file buffer
     * @param asVoice Whether the audio should be sent as a voice message (true or false)
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendAudioFromBuffer(
      buffer: Buffer,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Sends an audio from a URL.
     *
     * Example:
     * ```javascript
     * await sendAudioFromURL("https://example.com/audio.mp3");
     * ```
     * @param url URL of the audio to be sent
     * @param asVoice Whether the audio should be sent as a voice message (true or false)
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendAudioFromURL(
      url: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Sends a gif from a local file.
     *
     * Example:
     * ```javascript
     * await sendGifFromFile("./assets/something.gif", "Here's your gif @5511920202020", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file File path on the server
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendGifFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a gif from a URL.
     *
     * Example:
     * ```javascript
     * await sendGifFromURL("https://example.com/video.gif", "Here's your gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL of the gif to be sent
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendGifFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a gif from a buffer.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * or
     * const buffer = await getBuffer("https://example.com/video.gif");
     * await sendGifFromBuffer(buffer, "Here's your gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Gif buffer
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendGifFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends an image from a local file.
     *
     * Example:
     * ```javascript
     * await sendImageFromFile("./assets/image.png", "Here's your image @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file File path on the server
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendImageFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends an image from a buffer.
     *
     * Example:
     * ```javascript
     * const fs = require("node:fs");
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     *
     * const buffer = fs.readFileSync("./assets/image.png");
     * or
     * const buffer = await getBuffer("https://example.com/image.png");
     * await sendImageFromBuffer(buffer, "Here's your image @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Image buffer
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendImageFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends an image from a URL.
     *
     * Example:
     * ```javascript
     * await sendImageFromURL("https://example.com/image.png", "Here's your image @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL of the image to be sent
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendImageFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a reaction (emoji) on the message.
     *
     * Example:
     * ```javascript
     * await sendReact("👍");
     * ```
     * @param emoji Emoji to react with
     */
    sendReact(emoji: string): Promise<void>;

    /**
     * Simulates an audio recording action, sending a status message.
     *
     * @param anotherJid ID of another group/user to send the status to (optional)
     */
    sendRecordState(anotherJid?: string): Promise<void>;

    /**
     * Sends a success reaction (emoji ✅) on the message
     */
    sendSuccessReact(): Promise<void>;

    /**
     * Simulates a typing action, sending a status message.
     *
     * @param anotherJid ID of another group/user to send the status to (optional)
     */
    sendTypingState(anotherJid?: string): Promise<void>;

    /**
     * Sends a wait reaction (emoji ⏳) on the message.
     */
    sendWaitReact(): Promise<void>;

    /**
     * Sends a warning reaction (emoji ⚠️) on the message.
     */
    sendWarningReact(): Promise<void>;

    /**
     * Sends an error reaction (emoji ❌) on the message.
     */
    sendErrorReact(): Promise<void>;

    /**
     * Sends a message as a reply.
     *
     * Example:
     * ```javascript
     * await sendReply("Here's your answer!", [mentions]);
     * ```
     * @param text Message text
     * @param mentions Optional array of user IDs to mention
     */
    sendReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends a success message as a reply.
     *
     * Example:
     * ```javascript
     * await sendSuccessReply("Operation completed successfully!");
     * ```
     * @param text Success message text
     * @param mentions Optional array of user IDs to mention
     */
    sendSuccessReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends a warning message as a reply.
     *
     * Example:
     * ```javascript
     * await sendWarningReply("Warning! Something is not right.");
     * ```
     * @param text Warning message text
     * @param mentions Optional array of user IDs to mention
     */
    sendWarningReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends a wait message as a reply.
     *
     * Example:
     * ```javascript
     * await sendWaitReply("Please wait, I'm processing your request...");
     * ```
     * @param text Wait message text
     * @param mentions Optional array of user IDs to mention
     */
    sendWaitReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends an error message as a reply.
     *
     * Example:
     * ```javascript
     * await sendErrorReply("Could not find results!");
     * ```
     * @param text Error message text
     * @param mentions Optional array of user IDs to mention
     */
    sendErrorReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends a sticker from a local file.
     *
     * Example:
     * ```javascript
     * await sendStickerFromFile("./assets/sticker.webp");
     * ```
     * @param path File path on the server
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendStickerFromFile(path: string, quoted?: boolean): Promise<void>;

    /**
     * Sends a sticker from a URL.
     *
     * Example:
     * ```javascript
     * await sendStickerFromURL("https://example.com/sticker.webp");
     * ```
     * @param url URL of the sticker to be sent
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendStickerFromURL(url: string, quoted?: boolean): Promise<void>;

    /**
     * Sends a sticker from a buffer.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-sticker.webp"));
     * or
     * const buffer = await getBuffer("https://example.com/sticker.webp");
     * await sendStickerFromBuffer(buffer);
     * ```
     * @param buffer Sticker buffer
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendStickerFromBuffer(buffer: Buffer, quoted?: boolean): Promise<void>;

    /**
     * Sends a text message, optionally mentioning users.
     *
     * Example:
     * ```javascript
     * await sendText("Hello @user!", ["123456789@s.whatsapp.net"]);
     * ```
     * @param text Message text
     * @param mentions Optional array of user IDs to mention
     */
    sendText(text: string, mentions?: string[]): Promise<void>;

    /**
     * Sends a video from a local file.
     *
     * Example:
     * ```javascript
     * await sendVideoFromFile("./assets/video.mp4", "Here's your video!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file File path on the server
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendVideoFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a video from a URL.
     *
     * Example:
     * ```javascript
     * await sendVideoFromURL("https://example.com/video.mp4", "Here's your video @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL of the video to be sent
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendVideoFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a video from a buffer.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * or
     * const buffer = await getBuffer("https://example.com/video.mp4");
     * await sendVideoFromBuffer(buffer, "Here's the video @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Video buffer
     * @param caption Message text (optional)
     * @param mentions Optional array of user JIDs to mention
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendVideoFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a document from a local file.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples", "sample-document.pdf");
     * await sendDocumentFromFile(filePath, "application/pdf", "document.pdf");
     * ```
     * @param filePath File path
     * @param mimetype MIME type of the document (e.g.: "application/pdf", "text/plain")
     * @param fileName File name that will be displayed in WhatsApp
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendDocumentFromFile(
      filePath: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a document from a URL.
     *
     * Example:
     * ```javascript
     * await sendDocumentFromURL("https://example.com/document.pdf", "application/pdf", "document.pdf");
     * ```
     * @param url URL of the document to be sent
     * @param mimetype MIME type of the document (e.g.: "application/pdf", "text/plain")
     * @param fileName File name that will be displayed in WhatsApp
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendDocumentFromURL(
      url: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Sends a document from a buffer.
     *
     * Example:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-document.pdf"));
     * or
     * const buffer = await getBuffer("https://example.com/document.pdf");
     * await sendDocumentFromBuffer(buffer, "application/pdf", "document.pdf");
     * ```
     * @param buffer Document buffer
     * @param mimetype MIME type of the document (e.g.: "application/pdf", "text/plain")
     * @param fileName File name that will be displayed in WhatsApp
     * @param quoted Whether the message should be sent quoting another message (true or false)
     */
    sendDocumentFromBuffer(
      buffer: Buffer,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Gets complete group metadata.
     *
     * Example:
     * ```javascript
     * const metadata = await getGroupMetadata();
     * console.log("Group name:", metadata.subject);
     * console.log("Participants:", metadata.participants.length);
     * ```
     * @param jid Group ID (optional, uses current group if not provided)
     * @returns Promise with group metadata or null if not a group
     */
    getGroupMetadata(jid?: string): Promise<any | null>;

    /**
     * Gets the group name.
     *
     * Example:
     * ```javascript
     * const groupName = await getGroupName();
     * await sendReply(`Group name: ${groupName}`);
     * ```
     * @param groupJid Group ID (optional, uses current group if not provided)
     * @returns Promise with the group name or empty string if not a group
     */
    getGroupName(groupJid?: string): Promise<string>;

    /**
     * Gets the ID of the group owner/creator.
     *
     * Example:
     * ```javascript
     * const owner = await getGroupOwner();
     * await sendReply(`Group owner: @${owner.split("@")[0]}`, [owner]);
     * ```
     * @param groupJid Group ID (optional, uses current group if not provided)
     * @returns Promise with the owner ID or empty string if not a group
     */
    getGroupOwner(groupJid?: string): Promise<string>;

    /**
     * Gets list of group participants.
     *
     * Example:
     * ```javascript
     * const participants = await getGroupParticipants();
     * await sendReply(`Total participants: ${participants.length}`);
     * ```
     * @param groupJid Group ID (optional, uses current group if not provided)
     * @returns Promise with array of participants or empty array if not a group
     */
    getGroupParticipants(groupJid?: string): Promise<any[]>;

    /**
     * Gets list of group administrators.
     *
     * Example:
     * ```javascript
     * const admins = await getGroupAdmins();
     * const adminList = admins.map(admin => `@${admin.split("@")[0]}`).join(", ");
     * await sendReply(`Administrators: ${adminList}`, admins);
     * ```
     * @param groupJid Group ID (optional, uses current group if not provided)
     * @returns Promise with array of administrator IDs or empty array if not a group
     */
    getGroupAdmins(groupJid?: string): Promise<string[]>;

    /**
     * Sends a poll/vote in the chat.
     *
     * Example:
     * ```javascript
     * const options = [
     *   { optionName: "Option 1" },
     *   { optionName: "Option 2" },
     *   { optionName: "Option 3" }
     * ];
     *
     * await sendPoll("What's your favorite option?", options, true);
     * ```
     *
     * @param title Poll title
     * @param options Array of objects with optionName property that are the poll options
     * @param singleChoice If true, allows only one choice per user. If false, allows multiple choices
     * @returns Promise with the operation result
     */
    sendPoll(
      title: string,
      options: { optionName: string }[],
      singleChoice?: boolean
    ): Promise<void>;
  }
}

export {};
