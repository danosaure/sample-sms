import randomWords from 'random-words';

import {
  JOIN_STRING,
  MAX_WORD_COUNT,
  MAX_WORD_LENGTH,
  MIN_WORD_COUNT,
} from './constants';

export default () => randomWords({
  min: MIN_WORD_COUNT,
  max: MAX_WORD_COUNT,
  join: JOIN_STRING,
  maxLength: MAX_WORD_LENGTH,
});
