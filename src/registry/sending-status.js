import hal from 'hal';

import { sanitize, SENDING_STATUS } from '../api';
import { sendHal } from '../net';
import { hrtimeMillis, uriPath } from '../utils';

import { CACHE_KEYS, inc } from './cache';
import { byId as messageById } from './queue';
import { validate as validateSender } from './senders';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM, RESULT } = SENDING_STATUS;

export default async (req, res) => {
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Sending status report',
  }, href);

  const form = sanitize(FORM, req.body);
  // debug('form=', form);

  const senderId = form[FORM.SENDER_ID.KEY];
  if (validateSender(senderId)) {
    const messageId = form[FORM.MESSAGE_ID.KEY];
    const message = messageById(messageId);
    if (message) {
      inc(CACHE_KEYS.ATTEMPTS);

      // debug('message=', message);
      message.senderEnd = new Date();

      const delta = hrtimeMillis(message.senderStartHrtime);
      message.delta = delta;
      inc(CACHE_KEYS.PROCESS_TIME, delta);

      if (form[FORM.SUCCESS.KEY]) {
        inc(CACHE_KEYS.SUCCESSFUL);
      } else {
        inc(CACHE_KEYS.FAILED);

        // TODO: Re-queue error sending.
      }
    } else {
      // This should not happen.
      resource[RESULT.ERROR] = `Cannot find message id:${messageId}`;
    }
  } else {
    // TODO: Log access error
    resource[RESULT.ERROR] = 'Invalid sender ID';
  }

  sendHal(req, res, resource);
};
