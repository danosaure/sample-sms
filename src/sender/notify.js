import hal from 'hal';

import { NOTIFY_SENDER, sanitize } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import ingestMessage from './ingest-message';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { FORM } = NOTIFY_SENDER;

export default async (req, res) => {
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Sender notification',
  }, href);

  const form = sanitize(FORM, req.body);
  // debug('form=', form);

  const url = form[FORM.URL.KEY];
  // debug('url=', url);
  ingestMessage(url);

  sendHal(req, res, resource);
};
