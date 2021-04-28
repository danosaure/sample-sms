import generateMessage from './generate-message';
import generatePhoneNumber from './generate-phone-number';

export default (numberOfNotifications) => Array.from(new Array(numberOfNotifications)).map(() => ({
  number: generatePhoneNumber(),
  message: generateMessage(),
}));
