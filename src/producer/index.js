import { SEND_SMS } from '../api';
import { postJson, registry } from '../net';

import { NUMBER_OF_MESSAGES_TO_SEND } from './constants';
import generateNotifications from './generate-notifications';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM, KEY } = SEND_SMS;

export default async () => {
  try {
    const href = await registry(KEY);
    debug('href=', href);

    if (href) {
      const messages = generateNotifications(NUMBER_OF_MESSAGES_TO_SEND);
      // debug('messages=', messages);

      const form = {
        [FORM.MESSAGES.KEY]: messages,
      };
        // debug('form=', form);

      /* const resPost = */await postJson(href, form);
      // debug('resPost=', resPost);

      // eslint-disable-next-line no-console
      console.log('Number of messages put in queue:', NUMBER_OF_MESSAGES_TO_SEND);
    } else {
      // eslint-disable-next-line no-console
      console.error('Unable to find url to send messages.');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('*** ERROR *** Error sending messages:', err);
  }
};
