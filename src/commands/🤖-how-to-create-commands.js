/**
 * This is a command template.
 * Copy and paste this file to create a new command in one of the folders: admin, member or owner
 * You must rename it to make it easy to identify in the target folder.
 *
 * Owner folder: Commands that can only be executed by the group/bot owner
 * Admin folder: Commands that can only be executed by group administrators
 * Member folder: Commands that can be executed by any group member
 *
 * Functions and variables that can be extracted from handle in "handle: async ({ here })"
 * What you can extract from handle is defined in src/@types/index.d.ts
 * Careful, respect uppercase and lowercase!
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "command",
  description: "Command description",
  commands: ["command", "command2"],
  usage: `${PREFIX}command`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendAudioFromBuffer }) => {
    // command code
  },
};
