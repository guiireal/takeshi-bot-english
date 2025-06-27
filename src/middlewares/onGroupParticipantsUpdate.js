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
} = require("../utils/database");

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

    if (isActiveWelcomeGroup(remoteJid) && action === "add") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Invalid link");
          }

          const url = welcome(
            "participant",
            "You are the new group member!",
            link
          );

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `Welcome to our group, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `Welcome to our group, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `Welcome to our group, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
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

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Invalid link");
          }

          const url = exit("member", "You were a good member", link);

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `Goodbye, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `Goodbye, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `Goodbye, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
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
