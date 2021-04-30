import hal from 'hal';

import { STATUS } from '../api';
import { sendHal } from '../net';
import { uriPath } from '../utils';

import { CACHE_KEYS, get } from './cache';
import { size as queueSize } from './queue';

const { RESULT } = STATUS;

export default async (req, res) => {
  const href = uriPath(req);
  const resource = new hal.Resource({
    title: 'Server status',
  }, href);

  resource[RESULT.TOTAL] = get(CACHE_KEYS.TOTAL, 0);
  resource[RESULT.SUCCESSFUL] = get(CACHE_KEYS.SUCCESSFUL, 0);
  resource[RESULT.FAILED] = get(CACHE_KEYS.FAILED, 0);
  resource[RESULT.ATTEMPTS] = get(CACHE_KEYS.ATTEMPTS, 0);
  resource[RESULT.PROCESS_TIME] = get(CACHE_KEYS.PROCESS_TIME, 0);
  resource[RESULT.QUEUE_SIZE] = queueSize();

  sendHal(req, res, resource);
};
