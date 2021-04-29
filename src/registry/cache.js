// import _debug from './debug';
//
// const debug = _debug(__filename);

export const CACHE_KEYS = Object.freeze({
  ATTEMPTS: 'attempts',
  FAILED: 'failed',
  PROCESS_TIME: 'process-time',
  SUCCESSFUL: 'successful',
  TOTAL: 'total',
});

const cache = {
  [CACHE_KEYS.ATTEMPTS]: 0,
  [CACHE_KEYS.FAILED]: 0,
  [CACHE_KEYS.PROCESS_TIME]: 0,
  [CACHE_KEYS.SUCCESSFUL]: 0,
  [CACHE_KEYS.TOTAL]: 0,
};

export const get = (key) => cache[key];
export const set = (key, value) => {
  cache[key] = value;
};

export const inc = (key, increment = 1) => {
  cache[key] += increment;
};
