const path = require("path");

// Command prefix.
exports.PREFIX = "/";

// Bot emoji (change if you prefer).
exports.BOT_EMOJI = "🤖";

// Bot name (change if you prefer).
exports.BOT_NAME = "Takeshi Bot";

// Bot number.
// Numbers only, exactly as it appears in WhatsApp.
exports.BOT_NUMBER = "558112345678";

// Bot owner number.
// Numbers only, exactly as it appears in WhatsApp.
exports.OWNER_NUMBER = "5521950502020";

// Bot owner LID.
// To get the bot owner LID, use the <prefix>get-lid @mention or +owner phone command.
exports.OWNER_LID = "219999999999999@lid";

// Commands directory
exports.COMMANDS_DIR = path.join(__dirname, "commands");

// Database files directory.
exports.DATABASE_DIR = path.resolve(__dirname, "..", "database");

// Media files directory.
exports.ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Temporary files directory.
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Timeout in milliseconds per event (prevents banning).
exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 300;

// API platform
exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Get your token by creating an account at: https://api.spiderx.com.br.
exports.SPIDER_API_TOKEN = "your_token_here";

// If you want to respond only to a specific group,
// place its ID in the following configuration.
// To know the group ID, use the <prefix>getid command
// Replace <prefix> with the bot prefix (ex: /getid).
exports.ONLY_GROUP_ID = "";

// Project base directory.
exports.BASE_DIR = path.resolve(__dirname);

// If you want to use proxy.
exports.PROXY_PROTOCOL = "http";
exports.PROXY_HOST = "ip";
exports.PROXY_PORT = "port";
exports.PROXY_USERNAME = "username";
exports.PROXY_PASSWORD = "password";
