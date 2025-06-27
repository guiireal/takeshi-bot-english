const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const { onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "get-message-data",
  description:
    "Advanced example of how to get detailed information from the current message or quoted message, including media analysis, mentions and technical metadata",
  commands: ["get-message-data", "metadados", "info-msg"],
  usage: `${PREFIX}get-message-data [reply to a message to get its detailed metadata]`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendText,
    webMessage,
    userJid,
    remoteJid,
    isGroup,
    isImage,
    isVideo,
    isSticker,
    isReply,
    fullMessage,
    commandName,
    args,
    fullArgs,
    prefix,
    replyJid,
    getGroupMetadata,
  }) => {
    await sendReply(JSON.stringify(webMessage, null, 2));

    await delay(2000);

    await sendReact("📊");

    await delay(2000);

    await sendReply("🔍 Getting message metadata...");

    let targetMessage = webMessage;
    let isAnalyzingReply = false;

    if (
      isReply &&
      webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
    ) {
      targetMessage = {
        ...webMessage,
        message:
          webMessage.message.extendedTextMessage.contextInfo.quotedMessage,
        key: {
          ...webMessage.key,
          participant:
            webMessage.message.extendedTextMessage.contextInfo.participant ||
            replyJid,
          id: webMessage.message.extendedTextMessage.contextInfo.stanzaId,
        },
        messageTimestamp:
          webMessage.message.extendedTextMessage.contextInfo.quotedMessage
            .messageTimestamp || webMessage.messageTimestamp,
        pushName:
          webMessage.message.extendedTextMessage.contextInfo.pushName || "User",
      };
      isAnalyzingReply = true;
    }

    const analysisType = isAnalyzingReply
      ? "quoted message"
      : "current message";
    await sendReply(`🔍 Analyzing metadata of the *${analysisType}*:`);

    await delay(2000);

    const targetUserJid = isAnalyzingReply ? replyJid : userJid;
    const targetUserNumber = onlyNumbers(targetUserJid);

    const messageText = isAnalyzingReply
      ? getMessageText(targetMessage)
      : fullMessage;
    const messageType = getAdvancedMessageType(
      targetMessage,
      isAnalyzingReply,
      {
        isImage: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.imageMessage
          : isImage,
        isVideo: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.videoMessage
          : isVideo,
        isSticker: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.stickerMessage
          : isSticker,
      }
    );
    const mediaInfo = getEnhancedMediaInfo(targetMessage, isAnalyzingReply);
    const messageFlags = getMessageFlags(targetMessage, isAnalyzingReply, {
      isImage: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.imageMessage
        : isImage,
      isVideo: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.videoMessage
        : isVideo,
      isSticker: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.stickerMessage
        : isSticker,
    });

    const basicInfo = `📋 *${
      analysisType.charAt(0).toUpperCase() + analysisType.slice(1)
    } Information:*

🆔 *Identification:*
• User: @${targetUserNumber}
• JID: \`${targetUserJid}\`
• Chat: \`${remoteJid}\`
• Message ID: \`${targetMessage.key?.id || "N/A"}\`
• Timestamp: ${new Date(
      (targetMessage.messageTimestamp || 0) * 1000
    ).toLocaleString("en-US")}

📱 *Context:*
• Is group: ${isGroup ? "Yes" : "No"}
• Message type: ${messageType}
• Sender name: ${targetMessage.pushName || "N/A"}
• Sent by bot: ${targetMessage.key?.fromMe ? "Yes" : "No"}
• Is broadcast: ${targetMessage.broadcast ? "Yes" : "No"}

🏷️ *Media flags:*
${messageFlags}`;

    await sendText(basicInfo, [targetUserJid]);

    await delay(3000);

    const contentInfo = `💬 *Message Content:*

📝 *Text:*
${messageText ? `"${messageText}"` : "No text"}

🎯 *Type Details:*
${mediaInfo}

⚡ *Current Command Data:*
• Name: ${commandName}
• Prefix: ${prefix}
• Arguments: ${args.length > 0 ? args.join(", ") : "None"}
• Full args: ${fullArgs || "None"}
• Is reply: ${isReply ? "Yes" : "No"}`;

    await sendReply(contentInfo);

    await delay(3000);

    if (isGroup) {
      try {
        const groupMetadata = await getGroupMetadata();
        const participant = groupMetadata?.participants?.find(
          (p) => p.id === targetUserJid
        );

        const groupInfo = `👥 *Group Information:*

📊 *Participant:*
• Status: ${participant?.admin ? `Admin (${participant.admin})` : "Member"}
• Group name: ${groupMetadata?.subject || "N/A"}
• Total participants: ${groupMetadata?.participants?.length || 0}

🔧 *Settings:*
• Admins only: ${groupMetadata?.announce ? "Yes" : "No"}
• Join approval: ${groupMetadata?.restrict ? "Yes" : "No"}`;

        await sendReply(groupInfo);
        await delay(3000);
      } catch (error) {
        console.error("Error getting group metadata:", error);
      }
    }

    if (isReply) {
      const quotedMentions =
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      const replyInfo = `🔗 *Reply Information:*

📎 *Context:*
• Replying to: @${onlyNumbers(replyJid)}
• Original message ID: \`${
        webMessage.message?.extendedTextMessage?.contextInfo?.stanzaId || "N/A"
      }\`
• Analyzing: ${isAnalyzingReply ? "Quoted message" : "Your command message"}
• Mentions in quoted message: ${
        quotedMentions.length > 0 ? `${quotedMentions.length} user(s)` : "None"
      }

🔍 *Detailed Analysis:*
• Quoted message type: ${getMessageType(targetMessage)}
• Has multimedia: ${getMediaType(targetMessage) ? "Yes" : "No"}
• Quoted message date: ${new Date(
        (targetMessage.messageTimestamp || 0) * 1000
      ).toLocaleString("en-US")}`;

      await sendText(replyInfo, [replyJid]);
      await delay(3000);
    }

    await delay(3000);

    await sendReply(
      `💡 *Usage Tips:*

🎯 *For developers:*
• Use \`isReply\` to detect replies
• \`replyJid\` contains the quoted user's JID
• \`webMessage.message.extendedTextMessage.contextInfo\` has quoted message data
• \`getGroupMetadata()\` provides detailed group information

🔄 *Experiment:*
• Reply to a message with this command
• Use it on different media types
• Try in groups and private conversations`
    );
  },
};

function getMessageText(message) {
  const msg = message.message;
  if (!msg) return null;

  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    msg.documentMessage?.caption ||
    msg.audioMessage?.caption ||
    null
  );
}

function getAdvancedMessageType(message, isAnalyzingReply, systemFlags = {}) {
  const msg = message.message;
  if (!msg) return "Unknown";

  const basicType = getMessageType(message);

  let typeDetails = basicType;

  if (msg.extendedTextMessage?.contextInfo?.quotedMessage) {
    typeDetails += " (with quote)";
  }

  if (msg.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
    typeDetails += " (with mentions)";
  }

  if (
    systemFlags.isImage ||
    msg.imageMessage?.isGif ||
    msg.videoMessage?.gifPlayback
  ) {
    if (msg.imageMessage?.isGif || msg.videoMessage?.gifPlayback) {
      typeDetails += " (GIF)";
    }
  }

  if (msg.audioMessage?.ptt) {
    typeDetails = "Audio (voice note)";
  }

  const flags = [];
  if (systemFlags.isImage && !isAnalyzingReply) flags.push("📸");
  if (systemFlags.isVideo && !isAnalyzingReply) flags.push("🎥");
  if (systemFlags.isSticker && !isAnalyzingReply) flags.push("🏷️");

  if (flags.length > 0) {
    typeDetails += ` ${flags.join("")}`;
  }

  return typeDetails;
}

function getEnhancedMediaInfo(message) {
  const msg = message.message;
  if (!msg) return "No media";

  if (msg.imageMessage) {
    const isGif = msg.imageMessage.isGif ? " (GIF)" : "";
    return `📸 Image${isGif}
• Size: ${formatFileSize(msg.imageMessage.fileLength)}
• Dimensions: ${msg.imageMessage.width || "N/A"}x${
      msg.imageMessage.height || "N/A"
    }
• Mimetype: ${msg.imageMessage.mimetype || "N/A"}
• SHA256: ${msg.imageMessage.fileSha256 ? "✅" : "❌"}
• Caption: ${msg.imageMessage.caption || "No caption"}`;
  }

  if (msg.videoMessage) {
    const isGif = msg.videoMessage.gifPlayback ? " (GIF)" : "";
    return `🎥 Video${isGif}
• Size: ${formatFileSize(msg.videoMessage.fileLength)}
• Duration: ${msg.videoMessage.seconds || "N/A"}s
• Dimensions: ${msg.videoMessage.width || "N/A"}x${
      msg.videoMessage.height || "N/A"
    }
• Mimetype: ${msg.videoMessage.mimetype || "N/A"}
• SHA256: ${msg.videoMessage.fileSha256 ? "✅" : "❌"}
• Caption: ${msg.videoMessage.caption || "No caption"}`;
  }

  if (msg.audioMessage) {
    const isPtt = msg.audioMessage.ptt ? " (Voice note)" : "";
    return `🔊 Audio${isPtt}
• Size: ${formatFileSize(msg.audioMessage.fileLength)}
• Duration: ${msg.audioMessage.seconds || "N/A"}s
• Mimetype: ${msg.audioMessage.mimetype || "N/A"}
• SHA256: ${msg.audioMessage.fileSha256 ? "✅" : "❌"}
• Waveform: ${msg.audioMessage.waveform ? "✅" : "❌"}`;
  }

  if (msg.documentMessage) {
    return `📄 Document
• Name: ${msg.documentMessage.fileName || "N/A"}
• Size: ${formatFileSize(msg.documentMessage.fileLength)}
• Mimetype: ${msg.documentMessage.mimetype || "N/A"}
• SHA256: ${msg.documentMessage.fileSha256 ? "✅" : "❌"}
• Pages: ${msg.documentMessage.pageCount || "N/A"}`;
  }

  if (msg.stickerMessage) {
    const isAnimated = msg.stickerMessage.isAnimated ? " (Animated)" : "";
    return `🏷️ Sticker${isAnimated}
• Size: ${formatFileSize(msg.stickerMessage.fileLength)}
• Dimensions: ${msg.stickerMessage.width || "N/A"}x${
      msg.stickerMessage.height || "N/A"
    }
• Mimetype: ${msg.stickerMessage.mimetype || "N/A"}
• SHA256: ${msg.stickerMessage.fileSha256 ? "✅" : "❌"}`;
  }

  if (msg.contactMessage) {
    return `👤 Contact
• Name: ${msg.contactMessage.displayName || "N/A"}
• VCard: ${msg.contactMessage.vcard ? "✅" : "❌"}`;
  }

  if (msg.locationMessage) {
    return `📍 Location
• Latitude: ${msg.locationMessage.degreesLatitude || "N/A"}
• Longitude: ${msg.locationMessage.degreesLongitude || "N/A"}
• Name: ${msg.locationMessage.name || "N/A"}
• Address: ${msg.locationMessage.address || "N/A"}`;
  }

  return "Text without media";
}

function getMessageFlags(message) {
  const msg = message.message;
  if (!msg) return "No flags detected";

  const flags = [];

  if (msg.imageMessage) flags.push("📸 Image");
  if (msg.videoMessage) flags.push("🎥 Video");
  if (msg.audioMessage) flags.push("🔊 Audio");
  if (msg.documentMessage) flags.push("📄 Document");
  if (msg.stickerMessage) flags.push("🏷️ Sticker");
  if (msg.contactMessage) flags.push("👤 Contact");
  if (msg.locationMessage) flags.push("📍 Location");

  if (msg.imageMessage?.isGif || msg.videoMessage?.gifPlayback)
    flags.push("🎭 GIF");
  if (msg.audioMessage?.ptt) flags.push("🎤 Voice note");
  if (msg.stickerMessage?.isAnimated) flags.push("✨ Animated sticker");

  if (msg.extendedTextMessage?.contextInfo?.quotedMessage)
    flags.push("💬 With quote");
  if (msg.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
    flags.push(
      `👥 ${msg.extendedTextMessage.contextInfo.mentionedJid.length} mention(s)`
    );
  }

  if (message.key?.fromMe) flags.push("🤖 Sent by bot");
  if (message.broadcast) flags.push("📡 Broadcast");

  return flags.length > 0 ? flags.join("\n• ") : "No special flags";
}

function formatFileSize(bytes) {
  if (!bytes) return "N/A";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

function getMessageType(message) {
  const msg = message.message;
  if (!msg) return "Unknown";

  if (msg.conversation) return "Simple text";
  if (msg.extendedTextMessage) return "Extended text";
  if (msg.imageMessage) return "Image";
  if (msg.videoMessage) return "Video";
  if (msg.audioMessage) return "Audio";
  if (msg.documentMessage) return "Document";
  if (msg.stickerMessage) return "Sticker";
  if (msg.locationMessage) return "Location";
  if (msg.contactMessage) return "Contact";

  return Object.keys(msg)[0] || "Unknown";
}

function getMediaType(message) {
  const msg = message.message;
  if (!msg) return false;

  return !!(
    msg.imageMessage ||
    msg.videoMessage ||
    msg.audioMessage ||
    msg.documentMessage ||
    msg.stickerMessage
  );
}
