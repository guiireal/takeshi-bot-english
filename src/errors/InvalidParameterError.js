/**
 * Custom error class for
 * invalid parameters.
 *
 * @author Dev Gui
 */
class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParameterError";
  }
}

module.exports = {
  InvalidParameterError,
};
