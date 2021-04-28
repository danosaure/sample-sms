import { SEND_SMS } from '../api';
import { REGISTRY_URL } from '../constants';
import { getHal, postJson } from '../net';
import { getLinkHref } from '../utils';

import { NUMBER_OF_MESSAGES_TO_SEND } from './constants';
import generateNotifications from './generate-notifications';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM, KEY } = SEND_SMS;

export default async () => {
  try {
    const res = await getHal(REGISTRY_URL);
    // debug('res=', res);
    if (res.ok) {
      const { body } = res;
      const href = getLinkHref(body, KEY);
      if (href) {
        // debug('href=', href);

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
        throw new Error(`Cannot find "${KEY}" link on registry.`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Error registry:', res.body);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('*** ERROR *** Error connecting to registry:', err);
  }
};
