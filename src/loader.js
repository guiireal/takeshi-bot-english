/**
 * This script is responsible
 * for loading the events
 * that will be listened to by the
 * WhatsApp socket.
 *
 * @author Dev Gui
 */
const { TIMEOUT_IN_MILLISECONDS_BY_EVENT } = require("./config");
const { onMessagesUpsert } = require("./middlewares/onMesssagesUpsert");
const path = require("node:path");
const { errorLog } = require("./utils/logger");
const { badMacHandler } = require("./utils/badMacHandler");

exports.load = (socket) => {
  global.BASE_DIR = path.resolve(__dirname);
  const safeEventHandler = async (callback, data, eventName) => {
    try {
      await callback(data);
    } catch (error) {
      if (badMacHandler.handleError(error, eventName)) {
        return;
      }

      errorLog(`Error processing event ${eventName}: ${error.message}`);

      if (error.stack) {
        errorLog(`Stack trace: ${error.stack}`);
      }
    }
  };

  socket.ev.on("messages.upsert", async (data) => {
    const startProcess = Date.now();
    setTimeout(() => {
      safeEventHandler(
        () =>
          onMessagesUpsert({
            socket,
            messages: data.messages,
            startProcess,
          }),
        data,
        "messages.upsert"
      );
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });

  process.on("uncaughtException", (error) => {
    if (badMacHandler.handleError(error, "uncaughtException")) {
      return;
    }
    errorLog(`Uncaught error: ${error.message}`);
  });

  process.on("unhandledRejection", (reason) => {
    if (badMacHandler.handleError(reason, "unhandledRejection")) {
      return;
    }
    errorLog(`Unhandled rejected promise: ${reason}`);
  });
};
