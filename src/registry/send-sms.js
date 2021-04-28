import hal from 'hal';

import { sanitize, SEND_SMS } from '../api';
import { sendHal } from '../net';

import { PATHS, REGISTRY_PATH } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

export default async (req, res) => {
  // NOTE: RoutesInfo
  const href = `${REGISTRY_PATH}/${PATHS.SEND_SMS}`;
  const resource = new hal.Resource({
    title: 'Sending sms',
  }, href);

  const form = sanitize(SEND_SMS.FORM, req.body);
  debug('form=', form);

  sendHal(req, res, resource);
};
