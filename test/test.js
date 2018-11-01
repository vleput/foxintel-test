const { describe, it } = require('mocha');
const assert = require('assert');

const fs = require('fs');
const jsdom = require('jsdom');
const helpers = require('../src/helpers');
const {
  getCode,
  getName,
} = require('../src/parser');

const { JSDOM } = jsdom;
const inputString = fs.readFileSync('input/test.html', 'utf8', (err, data) => data.toString());
const validHtmlString = helpers.cleanInputString(inputString);
const validHtml = new JSDOM(validHtmlString).window.document;

describe('Parser', () => {
  it('should return null when code value does not exist', () => {
    const invalidString = validHtmlString.replace(/SNIKXP/g, '');
    const invalidHtml = new JSDOM(invalidString).window.document;
    assert.equal(getCode(invalidHtml), null);
  });

  it('should return the code value when it exists', () => {
    assert.equal(getCode(validHtml), 'SNIKXP');
  });

  it('should return null when name value does not exist', () => {
    const invalidString = validHtmlString.replace(/dupont/g, '');
    const invalidHtml = new JSDOM(invalidString).window.document;
    assert.equal(getName(invalidHtml), null);
  });

  it('should return the right name value when it exists', () => {
    const htmlString = validHtmlString.replace(/dupont/g, 'Martin');
    const valid = new JSDOM(htmlString).window.document;
    assert.equal(getName(valid), 'Martin');
  });
});
