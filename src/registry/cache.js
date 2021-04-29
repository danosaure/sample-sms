const cache = {};

export const CACHE_KEYS = Object.freeze({
  ATTEMPTS: 'attempts',
  FAILED: 'failed',
  PROCESS_TIME: 'process-time',
  SUCCESSFUL: 'successful',
  TOTAL: 'total',
});

export const get = (key, defaultValue) => ((typeof cache[key] === 'undefined') ? defaultValue : cache[key]);
export const set = (key, value) => {
  cache[key] = value;
};
