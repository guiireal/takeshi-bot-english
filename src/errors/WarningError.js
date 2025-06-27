/**
 * Custom error class for
 * warnings.
 *
 * @author Dev Gui
 */
class WarningError extends Error {
  constructor(message) {
    super(message);
    this.name = "WarningError";
  }
}

module.exports = {
  WarningError,
};
