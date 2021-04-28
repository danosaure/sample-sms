import * as moduleToTest from './constants';

import filespace, { checkProperties } from './_.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => expect(clone).to.be.empty());

  checkProperties(clone, [
    ['HAL_CONTENT_TYPE', 'string'],
    ['REGISTRY_URL', 'string'],
  ]);
});
