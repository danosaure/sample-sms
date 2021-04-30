import { envNumber, envString } from '../utils';

export const SENDER_DELAY = envNumber('SENDER_DELAY', 250);
export const SENDER_FAILURE_RATE = envNumber('SENDER_FAILURE_RATE', 5);
export const SENDER_PATH = envString('SENDER_PATH', '/sender');

export const PATHS = Object.freeze({
  NOTIFY: 'notify',
});
