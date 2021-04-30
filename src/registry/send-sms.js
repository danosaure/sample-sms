import hal from 'hal';

import { sanitize, SEND_SMS } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { add as addToQueue } from './queue';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM } = SEND_SMS;

export default async (req, res) => {
  // NOTE: RoutesInfo
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Sending sms',
  }, href);

  const form = sanitize(FORM, req.body);
  // debug('form=', form);
  // TODO: We could validate the form...

  const messages = form[FORM.MESSAGES.KEY];
  debug('messages=', messages);

  addToQueue(req, messages);

  sendHal(req, res, resource);
};
