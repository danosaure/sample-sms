import numberWithDefault from './number-with-default';

export default (envKey, defaultValue) => numberWithDefault(process.env[envKey], defaultValue);
