const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "group-functions",
  description: "Example of how to use group utility functions",
  commands: ["group-functions"],
  usage: `${PREFIX}group-functions`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendErrorReply,
    isGroup,
    getGroupMetadata,
    getGroupName,
    getGroupOwner,
    getGroupParticipants,
    getGroupAdmins,
    socket,
    remoteJid,
  }) => {
    await sendReact("👥");

    await delay(3000);

    if (!isGroup) {
      return await sendErrorReply("This command only works in groups!");
    }

    await sendReply("I'm going to demonstrate the group utility functions:");

    await delay(3000);

    const groupName = await getGroupName();
    await sendReply(`📝 *Group name:* ${groupName}`);

    await delay(3000);

    const groupOwner = await getGroupOwner();
    if (groupOwner) {
      await socket.sendMessage(remoteJid, {
        text: `👑 *Group owner:* @${groupOwner.split("@")[0]}`,
        mentions: [groupOwner],
      });
    }

    await delay(3000);

    const participants = await getGroupParticipants();
    await sendReply(`👤 *Total participants:* ${participants.length}`);

    await delay(3000);

    const admins = await getGroupAdmins();
    if (admins.length > 0) {
      const adminList = admins
        .map((admin) => `@${admin.split("@")[0]}`)
        .join(", ");
      await socket.sendMessage(remoteJid, {
        text: `👮 *Administrators (${admins.length}):*\n${adminList}`,
        mentions: admins,
      });
    } else {
      await sendReply("👮 *No administrators found.*");
    }

    await delay(3000);

    const metadata = await getGroupMetadata();
    if (metadata) {
      const creationDate = new Date(
        metadata.creation * 1000
      ).toLocaleDateString("en-US");
      const announce = metadata.announce ? "Yes" : "No";
      const restrict = metadata.restrict ? "Yes" : "No";

      await sendReply(
        `📊 *Group metadata:*\n\n` +
          `• ID: ${metadata.id}\n` +
          `• Created on: ${creationDate}\n` +
          `• Only admins send: ${announce}\n` +
          `• Join approval: ${restrict}\n` +
          `• Description: ${metadata.desc || "No description"}`
      );
    }

    await delay(3000);

    await sendReply(
      "💡 *Available functions:*\n\n" +
        "• `getGroupMetadata(remoteJid?)` - Complete metadata\n" +
        "• `getGroupName(remoteJid?)` - Group name\n" +
        "• `getGroupOwner(remoteJid?)` - Group owner\n" +
        "• `getGroupParticipants(remoteJid?)` - Participants list\n" +
        "• `getGroupAdmins(remoteJid?)` - Administrators list\n\n" +
        "🔧 *Optional parameter:*\n" +
        "• `remoteJid` - Group/conversation ID (if not provided, uses current group)"
    );
  },
};
