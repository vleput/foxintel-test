const jsdom = require('jsdom');
const helpers = require('./helpers');
const {
  getCode,
  getName,
  getTotalAmount,
  getRoundTrips,
  getCustomAmounts,
} = require('./parser');

/**
 * Use jsdom library to facilitate data manipulation
 */
const { JSDOM } = jsdom;
const getMainColumn = (input) => {
  const { document } = new JSDOM(input).window;
  return document.getElementById('main-column');
};

/**
 * Main function putting together the JSON output
 * @param {string} htmlString
 */
const htmlToJson = (htmlString) => {
  const cleanHtmlString = helpers.cleanInputString(htmlString);
  const html = getMainColumn(cleanHtmlString);

  const code = getCode(html);
  const name = getName(html);
  const totalAmount = getTotalAmount(html);
  const roundTrips = getRoundTrips(html);
  const customAmounts = getCustomAmounts(html);

  return {
    trips: [
      {
        code,
        name,
        details: {
          price: totalAmount,
          roundTrips,
        },
      },
    ],
    custom: {
      prices: customAmounts,
    },
  };
};

module.exports = htmlToJson;
