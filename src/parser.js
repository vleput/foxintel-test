const helpers = require('./helpers');

/**
 * This file contains the parser helpers for each section of
 * the result
 * If there is an error retrieving some properties, a warning is issued
 * and the rest of the properties are still parsed
 */

const getCode = (html) => {
  let code = html
    .querySelector('tbody tr td > table.block-pnr > tbody > tr > td.pnr-ref > span.pnr-info')
    .textContent.trim();
  if (!code) {
    helpers.notFoundWarning('Code');
    code = null;
  }
  return code;
};

const getName = (html) => {
  let name = html
    .querySelector('tbody tr td > table.block-pnr > tbody > tr > td.pnr-name > span.pnr-info')
    .textContent.trim();
  if (!name) {
    helpers.notFoundWarning('Name');
    name = null;
  }
  return name;
};

const getTotalAmount = (html) => {
  let price = html
    .querySelector('table.total-amount > tbody > tr > td.very-important')
    .textContent.trim();
  if (!price) {
    helpers.notFoundWarning('Total amount');
    price = null;
  } else {
    price = helpers.formatPrice(price);
  }
  return price;
};

const getRoundTrips = (html) => {
  const travelDates = html.querySelectorAll('.product-travel-date');
  const travelDatesList = Object.values(travelDates)
    .reduce((acc, value) => acc.concat(value.textContent.trim()), []);

  const productDetails = html.querySelectorAll('.product-details');
  return Object.values(productDetails).reduce((acc, product, index) => {
    const travelWay = product.querySelector('.travel-way').textContent.trim();
    const date = travelDatesList[index] ? helpers.formatDate(travelDatesList[index]) : null;
    const departureTime = product
      .querySelector('.origin-destination-hour.segment-departure')
      .textContent.trim().replace('h', ':');
    const arrivalTime = product
      .querySelector('.origin-destination-hour.segment-arrival')
      .textContent.trim().replace('h', ':');
    const departureStation = product
      .querySelector('.origin-destination-station.segment-departure')
      .textContent.trim();
    const arrivalStation = product
      .querySelector('.origin-destination-station.segment-arrival')
      .textContent.trim();
    const segments = product.querySelectorAll('tbody > tr > .segment');
    const type = segments[0].textContent.trim();
    const number = segments[1].textContent.trim();

    // TODO: need to handle passengers after figuring out in which case they need to be
    // in the output

    return acc.concat({
      type: travelWay,
      date,
      trains: [
        {
          departureTime,
          departureStation,
          arrivalTime,
          arrivalStation,
          type,
          number,
        },
      ],
    });
  }, []);
};

const getCustomAmounts = (html) => {
  const elements = html.querySelectorAll('.product-header');
  return Object.values(elements).reduce((acc, element) => {
    let amount = element.querySelector('tbody tr td:last-child').textContent.trim();
    if (!amount) {
      helpers.notFoundWarning('Custom amount');
      amount = null;
    } else {
      amount = helpers.formatPrice(amount);
    }
    return acc.concat({
      value: amount,
    });
  }, []);
};

module.exports = {
  getCode,
  getName,
  getTotalAmount,
  getRoundTrips,
  getCustomAmounts,
};
