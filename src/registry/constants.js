import { envNumber, envString } from '../utils';

export const REGISTRY_PORT = envNumber('REGISTRY_PORT', 9000);
export const REGISTRY_PATH = envString('REGISTRY_PATH', '/registry');

export const PATHS = Object.freeze({
  POP_MESSAGE: 'pop-message',
  REGISTER_SENDER: 'register-sender',
  SEND_SMS: 'send-sms',
  SENDING_STATUS: 'sending-status',
  STATUS: 'status',
});
