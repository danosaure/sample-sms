import * as moduleToTest from './index';

import { checkProperties } from '../_.test';

import filespace from './_.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };
  after(() => expect(clone).to.be.empty());
  checkProperties(clone, [
    ['getHal', 'function', 1, 1],
    ['postJson', 'function', 2],
    ['registry', 'function', 1],
    ['sendHal', 'function', 3, 1],
  ]);
});
