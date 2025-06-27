/**
 * Utility to handle "Bad MAC" errors
 * which are common in WhatsApp bots using Baileys.
 *
 * This module provides functions to detect, count
 * and gracefully handle these errors.
 *
 * @author Dev Gui
 */
const { errorLog, warningLog, infoLog } = require("./logger");
const path = require("node:path");
const fs = require("node:fs");

class BadMacHandler {
  constructor() {
    this.errorCount = 0;
    this.maxRetries = 5;
    this.resetInterval = 300000;
    this.lastReset = Date.now();
  }

  isBadMacError(error) {
    const errorMessage = error?.message || error?.toString() || "";
    return (
      errorMessage.includes("Bad MAC") ||
      errorMessage.includes("MAC verification failed") ||
      errorMessage.includes("decryption failed")
    );
  }

  isSessionError(error) {
    const errorMessage = error?.message || error?.toString() || "";
    return (
      errorMessage.includes("Session") ||
      errorMessage.includes("signal protocol") ||
      errorMessage.includes("decrypt") ||
      this.isBadMacError(error)
    );
  }

  clearProblematicSessionFiles() {
    try {
      const baileysFolder = path.resolve(
        process.cwd(),
        "assets",
        "auth",
        "baileys"
      );

      if (!fs.existsSync(baileysFolder)) {
        return false;
      }

      const files = fs.readdirSync(baileysFolder);
      let removedCount = 0;

      for (const file of files) {
        const filePath = path.join(baileysFolder, file);
        if (fs.statSync(filePath).isFile()) {
          if (
            file.includes("app-state-sync-key") ||
            file === "creds.json" ||
            file.includes("app-state-sync-version")
          ) {
            continue;
          }

          if (
            file.includes("pre-key") ||
            file.includes("sender-key") ||
            file.includes("session-") ||
            file.includes("signal-identity")
          ) {
            fs.unlinkSync(filePath);
            infoLog(`Problematic session file removed: ${file}`);
            removedCount++;
          }
        }
      }

      if (removedCount > 0) {
        warningLog(
          `${removedCount} problematic session files removed. Main credentials preserved.`
        );
        return true;
      }

      return false;
    } catch (error) {
      errorLog(`Error clearing session files: ${error.message}`);
      return false;
    }
  }

  incrementErrorCount() {
    this.errorCount++;
    errorLog(`Bad MAC error count: ${this.errorCount}/${this.maxRetries}`);

    const now = Date.now();
    if (now - this.lastReset > this.resetInterval) {
      this.resetErrorCount();
    }
  }

  resetErrorCount() {
    const previousCount = this.errorCount;
    this.errorCount = 0;
    this.lastReset = Date.now();

    if (previousCount > 0) {
      warningLog(
        `Bad MAC error counter reset. Previous count: ${previousCount}`
      );
    }
  }

  hasReachedLimit() {
    return this.errorCount >= this.maxRetries;
  }

  handleError(error, context = "unknown") {
    if (!this.isBadMacError(error)) {
      return false;
    }

    errorLog(`Bad MAC error detected in ${context}: ${error.message}`);
    this.incrementErrorCount();

    if (this.hasReachedLimit()) {
      warningLog(
        `Bad MAC error limit reached (${this.maxRetries}). Consider restarting the bot.`
      );
      return true;
    }

    warningLog(
      `Ignoring Bad MAC error and continuing operation... (${this.errorCount}/${this.maxRetries})`
    );
    return true;
  }

  createSafeWrapper(fn, context) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        if (this.handleError(error, context)) {
          return null;
        }
        throw error;
      }
    };
  }

  getStats() {
    return {
      errorCount: this.errorCount,
      maxRetries: this.maxRetries,
      lastReset: new Date(this.lastReset).toISOString(),
      timeUntilReset: Math.max(
        0,
        this.resetInterval - (Date.now() - this.lastReset)
      ),
    };
  }
}

const badMacHandler = new BadMacHandler();

module.exports = {
  BadMacHandler,
  badMacHandler,
};
