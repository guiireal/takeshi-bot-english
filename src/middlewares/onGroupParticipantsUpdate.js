/**
 * Event called when a user
 * joins or leaves a WhatsApp group.
 *
 * @author Dev Gui
 */
const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers } = require("../utils");
const {
  isActiveWelcomeGroup,
  isActiveExitGroup,
  isActiveGroup,
} = require("../utils/database");
const { welcomeMessage, exitMessage } = require("../messages");
const { catBoxUpload } = require("../services/catbox");
const {
  spiderAPITokenConfigured,
  exit,
  welcome,
} = require("../services/spider-x-api");

exports.onGroupParticipantsUpdate = async ({
  userJid,
  remoteJid,
  socket,
  action,
}) => {
  try {
    if (!remoteJid.endsWith("@g.us")) {
      return;
    }

    if (!isActiveGroup(remoteJid)) {
      return;
    }

    if (isActiveWelcomeGroup(remoteJid) && action === "add") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      const hasMemberMention = welcomeMessage.includes("@member");
      const mentions = [];

      let finalWelcomeMessage = welcomeMessage;

      if (hasMemberMention) {
        finalWelcomeMessage = welcomeMessage.replace(
          "@member",
          `@${onlyNumbers(userJid)}`
        );
        mentions.push(userJid);
      }

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Invalid link");
          }

          const url = welcome(
            "participant",
            "You are the newest member of the group!",
            link
          );

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: finalWelcomeMessage,
            mentions,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: finalWelcomeMessage,
            mentions,
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: finalWelcomeMessage,
          mentions,
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } else if (isActiveExitGroup(remoteJid) && action === "remove") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      const hasMemberMention = exitMessage.includes("@member");
      const mentions = [];

      let finalExitMessage = exitMessage;

      if (hasMemberMention) {
        finalExitMessage = exitMessage.replace(
          "@member",
          `@${onlyNumbers(userJid)}`
        );
        mentions.push(userJid);
      }

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Invalid link");
          }

          const url = exit("member", "You were a good member", link);

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: finalExitMessage,
            mentions,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: finalExitMessage,
            mentions,
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: finalExitMessage,
          mentions,
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    }
  } catch (error) {
    console.error("Error processing onGroupParticipantsUpdate event:", error);
    process.exit(1);
  }
};
