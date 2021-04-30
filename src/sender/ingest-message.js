import { POP_MESSAGE, SENDING_STATUS } from '../api';
import { postJson } from '../net';

import { getSenderId } from './cache';
import { SENDER_DELAY, SENDER_FAILURE_RATE } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM: POP_MESSAGE_FORM, RESULT } = POP_MESSAGE;
const { FORM: SENDING_STATUS_FORM } = SENDING_STATUS;

const ingest = async (url, id) => {
  // debug('should ingest message from url=', url);

  try {
    // NOTE: Ideally, we would set the id in a header, and use a GET call.
    const res = await postJson(url, {
      [POP_MESSAGE_FORM.ID.KEY]: id,
    });
    if (res.ok) {
      const { body } = res;
      const message = body[RESULT.MESSAGE];

      if (message) {
        // debug('message=', message);

        // Time out simulate delay of using external service.
        setTimeout(() => {
          const senderForm = {
            [SENDING_STATUS_FORM.SENDER_ID.KEY]: id,
            [SENDING_STATUS_FORM.MESSAGE_ID.KEY]: message.id,
          };

          const rate = Math.random() * 100;
          if (rate > SENDER_FAILURE_RATE) {
            // It's a success.
          } else {
            // It's a failure.
            senderForm[SENDING_STATUS_FORM.ERROR.KEY] = 'Error sending.';
          }

          debug('senderForm=', senderForm);

          // TODO: Send back report.

          // Try get next message...
          ingest(url, id);
        }, SENDER_DELAY);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('error fetching message.');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error fetching message:', err);
  }
};

export default async (url) => ingest(url, getSenderId());
