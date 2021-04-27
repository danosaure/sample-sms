import * as moduleToTest from './constants';

import { checkProperties } from '../_.test';

import filespace from './_.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => expect(clone).to.be.empty());

  checkProperties(clone, [
    ['JOIN_STRING', 'string'],
    ['MAX_WORD_COUNT', 'number'],
    ['MAX_WORD_LENGTH', 'number'],
    ['MESSAGE_MAX_LENGTH', 'number'],
    ['MIN_WORD_COUNT', 'number'],
    ['NUMBER_OF_MESSAGES_TO_SEND', 'number'],
  ]);
});
