import hal from 'hal';

import { sanitize, REGISTER_SENDER } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { add as addSender } from './senders';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM, RESULT } = REGISTER_SENDER;

export default async (req, res) => {
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Registering sender',
  }, href);

  const form = sanitize(FORM, req.body);
  // TODO: validate form.

  const url = form[FORM.URL.KEY];
  const id = addSender(url);

  resource[RESULT.ID] = id;

  sendHal(req, res, resource);
};
