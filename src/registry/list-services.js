import hal from 'hal';

import { REGISTRY_PATH } from './constants';
import { sendHal } from '../server';

import _debug from './debug';

const debug = _debug(__filename);

export default async (req, res) => {
  // I usually have a library to generate this route (RoutesInfo).
  const href = `${REGISTRY_PATH}/`;

  const resource = new hal.Resource({
    title: 'Registry',
  }, href);

  debug('resource=', resource);

  sendHal(req, res, resource);
};
