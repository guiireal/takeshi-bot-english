/**
 * Bot initialization
 * script.
 *
 * This script is
 * responsible for
 * starting the connection
 * with WhatsApp.
 *
 * It is not recommended to alter
 * this file,
 * unless you know
 * what you are doing.
 *
 * @author Dev Gui
 */
const path = require("node:path");
const { question, onlyNumbers } = require("./utils");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
  isJidStatusBroadcast,
  isJidNewsletter,
} = require("baileys");
const pino = require("pino");
const { load } = require("./loader");
const {
  warningLog,
  infoLog,
  errorLog,
  sayLog,
  successLog,
} = require("./utils/logger");
const NodeCache = require("node-cache");
const { TEMP_DIR } = require("./config");
const { badMacHandler } = require("./utils/badMacHandler");

const logger = pino(
  { timestamp: () => `,"time":"${new Date().toJSON()}"` },
  pino.destination(path.join(TEMP_DIR, "wa-logs.txt"))
);

logger.level = "error";

const msgRetryCounterCache = new NodeCache();

async function connect() {
  const baileysFolder = path.resolve(
    __dirname,
    "..",
    "assets",
    "auth",
    "baileys"
  );

  const { state, saveCreds } = await useMultiFileAuthState(baileysFolder);

  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    logger,
    defaultQueryTimeoutMs: undefined,
    retryRequestDelayMs: 5000,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 30_000,
    maxMsgRetryCount: 5,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
  });

  if (!socket.authState.creds.registered) {
    warningLog("Credentials not yet configured!");

    infoLog('Enter the bot phone number (example: "5511920202020"):');

    const phoneNumber = await question("Enter the bot phone number: ");

    if (!phoneNumber) {
      errorLog('Invalid phone number! Try again with the "npm start" command.');

      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    sayLog(`Pairing code: ${code}`);
  }

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const error = lastDisconnect?.error;
      const statusCode = error?.output?.statusCode;

      if (
        error?.message?.includes("Bad MAC") ||
        error?.toString()?.includes("Bad MAC")
      ) {
        errorLog("Bad MAC error on disconnection detected");

        if (badMacHandler.handleError(error, "connection.update")) {
          if (badMacHandler.hasReachedLimit()) {
            warningLog(
              "Bad MAC error limit reached. Clearing problematic session files..."
            );
            badMacHandler.clearProblematicSessionFiles();
            badMacHandler.resetErrorCount();

            const newSocket = await connect();
            load(newSocket);
            return;
          }
        }
      }

      if (statusCode === DisconnectReason.loggedOut) {
        errorLog("Bot disconnected!");
        badMacErrorCount = 0;
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("Invalid session!");

            const sessionError = new Error("Bad session detected");
            if (badMacHandler.handleError(sessionError, "badSession")) {
              if (badMacHandler.hasReachedLimit()) {
                warningLog(
                  "Session error limit reached. Clearing session files..."
                );
                badMacHandler.clearProblematicSessionFiles();
                badMacHandler.resetErrorCount();
              }
            }
            break;
          case DisconnectReason.connectionClosed:
            warningLog("Connection closed!");
            break;
          case DisconnectReason.connectionLost:
            warningLog("Connection lost!");
            break;
          case DisconnectReason.connectionReplaced:
            warningLog("Connection replaced!");
            break;
          case DisconnectReason.multideviceMismatch:
            warningLog("Incompatible device!");
            break;
          case DisconnectReason.forbidden:
            warningLog("Forbidden connection!");
            break;
          case DisconnectReason.restartRequired:
            infoLog('Please restart me! Type "npm start".');
            break;
          case DisconnectReason.unavailableService:
            warningLog("Service unavailable!");
            break;
        }

        const newSocket = await connect();
        load(newSocket);
      }
    } else if (connection === "open") {
      successLog("I was connected successfully!");
      badMacErrorCount = 0;
      badMacHandler.resetErrorCount();
    } else {
      infoLog("Updating connection...");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
}

exports.connect = connect;
