/**
 * Bot menu
 *
 * @author Dev Gui
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩ WELCOME! ⪨━━${readMore()}
▢
▢ • ${BOT_NAME}
▢ • Date: ${date.toLocaleDateString("en-us")}
▢ • Time: ${date.toLocaleTimeString("en-us")}
▢ • Prefix: ${PREFIX}
▢ • Version: ${packageInfo.version}
▢
╰━━─「🪐」─━━

╭━━⪩ OWNER ⪨━━
▢
▢ • ${PREFIX}exec
▢ • ${PREFIX}get-id
▢ • ${PREFIX}off
▢ • ${PREFIX}on
▢ • ${PREFIX}set-menu-image
▢
╰━━─「🌌」─━━

╭━━⪩ ADMINS ⪨━━
▢
▢ • ${PREFIX}anti-link (1/0)
▢ • ${PREFIX}auto-responder (1/0)
▢ • ${PREFIX}ban
▢ • ${PREFIX}clear
▢ • ${PREFIX}close
▢ • ${PREFIX}delete
▢ • ${PREFIX}demote
▢ • ${PREFIX}exit (1/0)
▢ • ${PREFIX}hidetag
▢ • ${PREFIX}mute
▢ • ${PREFIX}only-admin (1/0)
▢ • ${PREFIX}open
▢ • ${PREFIX}promote
▢ • ${PREFIX}reveal
▢ • ${PREFIX}schedule-message
▢ • ${PREFIX}unmute
▢ • ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ MAIN ⪨━━
▢
▢ • ${PREFIX}attp
▢ • ${PREFIX}fake-chat
▢ • ${PREFIX}generate-link
▢ • ${PREFIX}get-lid
▢ • ${PREFIX}google-search
▢ • ${PREFIX}perfil
▢ • ${PREFIX}profile
▢ • ${PREFIX}raw-message
▢ • ${PREFIX}rename
▢ • ${PREFIX}samples-of-messages
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢ • ${PREFIX}ttp
▢ • ${PREFIX}yt-search
▢
╰━━─「🚀」─━━

╭━━⪩ DOWNLOADS ⪨━━
▢
▢ • ${PREFIX}play-audio
▢ • ${PREFIX}play-video
▢ • ${PREFIX}tik-tok
▢ • ${PREFIX}yt-mp3
▢ • ${PREFIX}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ GAMES ⪨━━
▢
▢ • ${PREFIX}dice
▢ • ${PREFIX}fight
▢ • ${PREFIX}have-dinner
▢ • ${PREFIX}hit
▢ • ${PREFIX}hug
▢ • ${PREFIX}kill
▢ • ${PREFIX}kiss
▢ • ${PREFIX}slap
▢
╰━━─「🎡」─━━

╭━━⪩ AI ⪨━━
▢
▢ • ${PREFIX}gemini
▢ • ${PREFIX}ia-sticker
▢ • ${PREFIX}pixart
▢ • ${PREFIX}stable-diffusion-turbo
▢
╰━━─「🚀」─━━

╭━━⪩ CANVAS ⪨━━
▢
▢ • ${PREFIX}blur
▢ • ${PREFIX}contrast
▢ • ${PREFIX}gray
▢ • ${PREFIX}invert
▢ • ${PREFIX}jail
▢ • ${PREFIX}mirror
▢ • ${PREFIX}pixel
▢ • ${PREFIX}rip
▢
╰━━─「❇」─━━`;
};
