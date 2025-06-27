const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getProfileImageData } = require(`${BASE_DIR}/services/baileys`);

module.exports = {
  name: "profile",
  description: "Show user information",
  commands: ["profile"],
  usage: `${PREFIX}profile or profile @user`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    socket,
    remoteJid,
    userJid,
    sendErrorReply,
    sendWaitReply,
    sendSuccessReact,
  }) => {
    if (!isGroup(remoteJid)) {
      throw new InvalidParameterError(
        "This command can only be used in a group."
      );
    }

    const targetJid = args[0]
      ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net"
      : userJid;

    await sendWaitReply("Loading profile...");

    try {
      let profilePicUrl;
      let userName;
      let userRole = "Member";

      try {
        const { profileImage } = await getProfileImageData(socket, targetJid);
        profilePicUrl = profileImage || `${ASSETS_DIR}/images/default-user.png`;

        const contactInfo = await socket.onWhatsApp(targetJid);
        userName = contactInfo[0]?.name || "Unknown User";
      } catch (error) {
        errorLog(
          `Error trying to get user data ${targetJid}: ${JSON.stringify(
            error,
            null,
            2
          )}`
        );
        profilePicUrl = `${ASSETS_DIR}/images/default-user.png`;
      }

      const groupMetadata = await socket.groupMetadata(remoteJid);

      const participant = groupMetadata.participants.find(
        (participant) => participant.id === targetJid
      );

      if (participant?.admin) {
        userRole = "Administrator";
      }

      const randomPercent = Math.floor(Math.random() * 100);
      const programPrice = (Math.random() * 5000 + 1000).toFixed(2);
      const beautyLevel = Math.floor(Math.random() * 100) + 1;

      const message = `
👤 *Name:* @${targetJid.split("@")[0]}
🎖️ *Role:* ${userRole}

🌚 *Program:* R$ ${programPrice}
🐮 *Cattle:* ${randomPercent + 7 || 5}%
🎱 *Passive:* ${randomPercent + 5 || 10}%
✨ *Beauty:* ${beautyLevel}%`;

      const mentions = [targetJid];

      await sendSuccessReact();

      await socket.sendMessage(remoteJid, {
        image: { url: profilePicUrl },
        caption: message,
        mentions: mentions,
      });
    } catch (error) {
      console.error(error);
      sendErrorReply("An error occurred while trying to check the profile.");
    }
  },
};
