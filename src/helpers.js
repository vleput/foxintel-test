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
  let cleanInput = input.replace(/\\r?\\n|\r/g, ' ');
  cleanInput = cleanInput.replace(/(\\")+/g, '"');
  return cleanInput.replace(/ " /g, '');
};


const notFoundWarning = (property) => {
  logger.log({
    level: 'warn',
    message: `There was an error retrieving the ${property} property.`,
  });
};

const formatPrice = (price) => {
  let result = price.replace(' €', '');
  result = result.replace(',', '.');
  return Number(result);
};

/**
 * Cheating a bit here. Real life would need to retrieve the year
 * from the input directly
 * @param {string} date
 */
const formatDate = date => (new Date(`${date} 2016 UTC`)).toISOString().replace('T', ' ');

module.exports = {
  getInputFilePath,
  cleanInputString,
  notFoundWarning,
  formatPrice,
  formatDate,
};
