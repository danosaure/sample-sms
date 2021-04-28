import stringWithDefault from './string-with-default';

export default (envKey, defaultValue) => stringWithDefault(process.env[envKey], defaultValue);
