import hal from 'hal';

import { sanitize, POP_MESSAGE } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { byId as messageById, popId as popMessageId } from './queue';
import { validate as validateSender } from './senders';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM, RESULT } = POP_MESSAGE;

export default async (req, res) => {
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Retrieve new message',
  }, href);

  const form = sanitize(FORM, req.body);

  const id = form[FORM.ID.KEY];
  if (validateSender(id)) {
    const messageId = popMessageId();
    if (messageId) {
      const message = messageById(messageId);
      if (message) {
        message.senderId = id;
        message.senderStart = new Date();
        resource[RESULT.MESSAGE] = message;
      } else {
        // This should not happen.
        resource[RESULT.ERROR] = `Cannot find message id:${messageId}`;
      }
    }
  } else {
    // TODO: Log access

    resource[RESULT.ERROR] = 'Invalid sender ID';
  }

  sendHal(req, res, resource);
};
