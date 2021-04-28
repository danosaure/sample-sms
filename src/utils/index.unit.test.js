import * as moduleToTest from './index';

import { checkProperties } from '../_.test';

import filespace from './_.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => expect(clone).to.be.empty());

  checkProperties(clone, [
    ['envNumber', 'function', 2],
    ['envString', 'function', 2],
    ['getLinkHref', 'function', 2],
    ['numberWithDefault', 'function', 2],
    ['stringWithDefault', 'function', 2],
  ]);
});
