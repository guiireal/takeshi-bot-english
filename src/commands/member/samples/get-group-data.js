const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "get-group-data",
  description: "Example of how to get detailed group information",
  commands: ["get-group-data"],
  usage: `${PREFIX}get-group-data`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendErrorReply,
    getGroupMetadata,
    isGroup,
    socket,
    remoteJid,
  }) => {
    await sendReact("👥");

    await delay(3000);

    if (!isGroup) {
      return await sendErrorReply("This command only works in groups!");
    }

    await sendReply("I'm going to get the current group information:");

    await delay(3000);

    try {
      const groupMetadata = await getGroupMetadata();

      const groupInfo = `👥 *Group Information:*

📝 *Basic:*
• Name: ${groupMetadata.subject}
• Description: ${groupMetadata.desc || "No description"}
• ID: ${groupMetadata.id}

👤 *Participants:*
• Total: ${groupMetadata.participants.length} members
• Admins: ${groupMetadata.participants.filter((p) => p.admin).length}
• Members: ${groupMetadata.participants.filter((p) => !p.admin).length}

⚙️ *Settings:*
• Created on: ${new Date(groupMetadata.creation * 1000).toLocaleDateString(
        "en-US"
      )}
• Owner: ${groupMetadata.owner || "N/A"}
• Only admins can send: ${groupMetadata.announce ? "Yes" : "No"}
• Approval to join: ${groupMetadata.restrict ? "Yes" : "No"}`;

      await sendReply(groupInfo);

      await delay(3000);

      const admins = groupMetadata.participants.filter((p) => p.admin);

      if (admins.length > 0) {
        const adminList =
          `👑 *Administrators (${admins.length}):*\n\n` +
          admins
            .map(
              (admin, index) =>
                `${index + 1}. @${admin.id.split("@")[0]} ${
                  admin.admin === "superadmin" ? "(Creator)" : "(Admin)"
                }`
            )
            .join("\n");

        await socket.sendMessage(remoteJid, {
          text: adminList,
          mentions: admins.map((admin) => admin.id),
        });
      }

      await delay(3000);

      await sendReply(
        "💡 *Useful functions:*\n\n" +
          "• `socket.groupMetadata(jid) or getGroupMetadata()` - Get group metadata\n" +
          "• `groupMetadata.participants` - List participants\n" +
          "• `groupMetadata.subject` - Group name\n" +
          "• `groupMetadata.desc` - Group description"
      );
    } catch (error) {
      await sendErrorReply(`Error getting group data: ${error.message}`);
    }
  },
};
