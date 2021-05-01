import * as moduleToTest from './index';

import { checkProperties } from '../_.test';

import filespace, { checkApi } from './_.test';

const APIS = [
  'NOTIFY_SENDER',
  'POP_MESSAGE',
  'REGISTER_SENDER',
  'SEND_SMS',
  'SENDING_STATUS',
  'STATUS',
];

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => expect(clone).to.be.empty());

  APIS.forEach((api) => {
    checkApi(api, moduleToTest[api]);
    checkProperties(clone, [
      [api, 'object'],
    ]);
  });

  checkProperties(clone, [
    ['sanitize', 'function', 2],
  ]);
});
