const logger = require('./logger');

/**
 * Retrieve input file path from CLI args
 */
const getInputFilePath = () => {
  if (!process.argv[2]) {
    logger.log({
      level: 'error',
      message: 'Please provide the path to the file you would like to parse!',
    });
    process.exit();
  }
  return `/${process.argv[2]}`;
};

/**
 * Clean the file input string
 * @param {string} input
 */
const cleanInputString = (input) => {
  input.replace(/(?:\\[rn])+/g, '');
  input.replace(/(\\")+/g, '"');
  return input;
};

module.exports = {
  getInputFilePath,
  cleanInputString,
};
