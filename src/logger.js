const { createLogger, format, transports } = require('winston');

/**
 * Basic console logger
 */
const logger = createLogger({
  format: format.combine(format.colorize(), format.simple()),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
