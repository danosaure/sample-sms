import * as moduleToTest from './constants';

import { checkProperties } from '../_.test';

import filespace from './_.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };
  after(() => expect(clone).to.be.empty());

  checkProperties(clone, [
    ['CONTENT_TYPES', 'object', 'string'],
    ['HEADERS', 'object', 'string'],
  ]);

  describe('.CONTENT_TYPES', () => {
    const ctClone = { ...moduleToTest.CONTENT_TYPES };
    after(() => expect(ctClone).to.be.empty());

    checkProperties(ctClone, [
      ['HAL', 'string'],
      ['JSON', 'string'],
    ]);
  });

  describe('.HEADERS', () => {
    const hClone = { ...moduleToTest.HEADERS };
    after(() => expect(hClone).to.be.empty());

    checkProperties(hClone, [
      ['ACCEPT', 'string'],
      ['CONTENT_TYPE', 'string'],
    ]);
  });

});
