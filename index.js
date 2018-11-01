const fs = require('fs');
const path = require('path');
const helpers = require('./src/helpers');
const logger = require('./src/logger');
const htmlToJson = require('./src/main');

// Get input argument and read file
const filepath = path.join(__dirname, helpers.getInputFilePath());
const rawInputString = fs.readFileSync(filepath, 'utf8', (err, data) => {
  if (err) {
    logger.log({
      level: 'error',
      message: 'An error occurred trying to read your file',
    });
    throw err;
  }
  return data.toString();
});

// Convert the html string to a parsed JSON string
const outputJson = htmlToJson(rawInputString);
const result = {
  status: 'ok',
  result: outputJson,
};
const prettyResult = JSON.stringify(result, null, 2);

// Write the JSON result in a file and log the output in the console
fs.writeFileSync('./output/result.json', prettyResult);
logger.log({
  level: 'info',
  message: prettyResult,
});
logger.log({
  level: 'info',
  message: 'All good! You can find the result JSON in the output folder.',
});
