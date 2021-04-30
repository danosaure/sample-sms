import hal from 'hal';

import { sanitize, POP_MESSAGE, SENDING_STATUS } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { PATHS, REGISTRY_PATH } from './constants';
import { byId as messageById, popId as popMessageId } from './queue';
import { validate as validateSender } from './senders';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM, RESULT } = POP_MESSAGE;
const { KEY: SENDING_STATUS_KEY } = SENDING_STATUS;

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
        message.senderEnd = null;

        resource[RESULT.MESSAGE] = {
          id: message.id,
          number: message.number,
          message: message.message,
        };

        resource.link(SENDING_STATUS_KEY, {
          title: 'Sending status report',
          href: uriPath(req, `${REGISTRY_PATH}/${PATHS.SENDING_STATUS}`),
        });

        // TODO: Log ingestion
      } else {
        // This should not happen.
        resource[RESULT.ERROR] = `Cannot find message id:${messageId}`;
      }
    }
  } else {
    // TODO: Log access error
    resource[RESULT.ERROR] = 'Invalid sender ID';
  }

  sendHal(req, res, resource);
};
