const fs = require('fs');
const path = require('path');

class Logger {
  static log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logMessage = {
      timestamp,
      level,
      message,
      .. .(data && { data })
    };

    console.log(`[${timestamp}] ${level. toUpperCase()}: ${message}`);

    // Write to file
    const logFile = path.join(__dirname, '../../logs', `${level}. log`);
    fs.appendFileSync(logFile, JSON. stringify(logMessage) + '\n');
  }

  static info(message, data) {
    this.log('info', message, data);
  }

  static error(message, data) {
    this.log('error', message, data);
  }

  static warn(message, data) {
    this.log('warn', message, data);
  }

  static debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }
}

module.exports = Logger;