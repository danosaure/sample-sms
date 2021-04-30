import hal from 'hal';

import { REGISTER_SENDER, SEND_SMS, STATUS } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { PATHS, REGISTRY_PATH } from './constants';

// import _debug from './debug';
//
// const debug = _debug(__filename);

export default async (req, res) => {
  // NOTE: I usually have a library to generate this route (RoutesInfo).
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Registry',
  }, href);

  resource.link(SEND_SMS.KEY, {
    title: 'Sending messages',
    href: uriPath(req, `${REGISTRY_PATH}/${PATHS.SEND_SMS}`),
  });
  // NOTE: We could setup configuration for that route, something like:
  //  resource.configs[SEND_SMS.KEY] = {
  //    max_chunk_size: 30, // can only send 30 per request
  //    max_message_size: 100, // 100-char max per message
  //    ...
  //  }

  resource.link(STATUS.KEY, {
    title: 'Server status',
    href: uriPath(req, `${REGISTRY_PATH}/${PATHS.STATUS}`),
  });

  resource.link(REGISTER_SENDER.KEY, {
    title: 'Sender registration',
    href: uriPath(req, `${REGISTRY_PATH}/${PATHS.REGISTER_SENDER}`),
  });

  // debug('resource=', resource);

  sendHal(req, res, resource);
};
