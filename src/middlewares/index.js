/**
 * Various interceptors.
 *
 * @author Dev Gui
 */
const { PREFIX, OWNER_NUMBER, OWNER_LID } = require("../config");
const { toUserJid } = require("../utils");

exports.verifyPrefix = (prefix) => PREFIX === prefix;
exports.hasTypeOrCommand = ({ type, command }) => type && command;

exports.isLink = (text) => {
  const cleanText = text.trim();

  if (/^\d+$/.test(cleanText)) {
    return false;
  }

  try {
    const url = new URL(cleanText);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    try {
      const url = new URL("https://" + cleanText);

      const originalHostname = cleanText
        .split("/")[0]
        .split("?")[0]
        .split("#")[0];

      return (
        url.hostname.includes(".") &&
        originalHostname.includes(".") &&
        url.hostname.length > 4 &&
        !/^\d+$/.test(originalHostname)
      );
    } catch (error) {
      return false;
    }
  }
};

exports.isAdmin = async ({ remoteJid, userJid, socket }) => {
  const { participants, owner } = await socket.groupMetadata(remoteJid);

  const participant = participants.find(
    (participant) => participant.id === userJid
  );

  if (!participant) {
    return false;
  }

  const isOwner =
    participant.id === owner ||
    participant.admin === "superadmin" ||
    participant.id === toUserJid(OWNER_NUMBER);

  const isAdmin = participant.admin === "admin";

  return isOwner || isAdmin;
};

exports.isBotOwner = ({ userJid, isLid }) => {
  return isLid ? userJid === OWNER_LID : userJid === toUserJid(OWNER_NUMBER);
};
