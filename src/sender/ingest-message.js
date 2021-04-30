import { POP_MESSAGE, SENDING_STATUS } from '../api';
import { postJson } from '../net';
import { getLinkHref } from '../utils';

import { getSenderId } from './cache';
import { SENDER_DELAY, SENDER_FAILURE_RATE } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM: POP_MESSAGE_FORM, RESULT } = POP_MESSAGE;
const { FORM: SENDING_STATUS_FORM } = SENDING_STATUS;

const ingest = async (ingestUrl, id) => {
  // debug('should ingest message from ingestUrl=', ingestUrl);

  try {
    // NOTE: Ideally, we would set the id in a header, and use a GET call.
    const ingestRes = await postJson(ingestUrl, {
      [POP_MESSAGE_FORM.ID.KEY]: id,
    });
    if (ingestRes.ok) {
      const { body } = ingestRes;
      // debug('ingestRes body=', body);

      const message = body[RESULT.MESSAGE];
      const sendingStatusUrl = getLinkHref(body, SENDING_STATUS.KEY);
      // debug('sendingStatusUrl=', sendingStatusUrl);

      if (message) {
        // debug('message=', message);

        // Time out simulate delay of using external service.
        setTimeout(async () => {
          const sendingStatusForm = {
            [SENDING_STATUS_FORM.SENDER_ID.KEY]: id,
            [SENDING_STATUS_FORM.MESSAGE_ID.KEY]: message.id,
          };

          const rate = Math.random() * 100;
          if (rate > SENDER_FAILURE_RATE) {
            // It's a success.
            sendingStatusForm[SENDING_STATUS_FORM.SUCCESS.KEY] = true;
          } else {
            // It's a failure.
            sendingStatusForm[SENDING_STATUS_FORM.SUCCESS.KEY] = false;
            sendingStatusForm[SENDING_STATUS_FORM.ERROR.KEY] = 'Error sending.';
          }

          // debug('sendingStatusForm=', sendingStatusForm);

          try {
            const sendingStatusRes = await postJson(sendingStatusUrl, sendingStatusForm);
            if (sendingStatusRes.ok) {
              debug('sending status reported back successfully.');
            } else {
            // TODO: Unable to send status report. What to do?
            // eslint-disable-next-line no-console
              console.error('Unable to update sending status:', sendingStatusRes.status, sendingStatusUrl);
            }
          } catch (sendingStatusError) {
            // TODO: Unable to send status report. What to do?
            // eslint-disable-next-line no-console
            console.error('Unable to update sending status:', sendingStatusError);
          }

          // Try get next message...
          ingest(ingestUrl, id);
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

export default async (ingestUrl) => ingest(ingestUrl, getSenderId());
