import debug from 'debug';

import flattenInfo from './flatten-info';

const DEBUG_KEY = 'SMS';

export default (info) => {
  const key = flattenInfo(['src', info]);

  return debug(`${DEBUG_KEY}:${key}`);
};
