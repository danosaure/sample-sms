import { STATUS } from '../api';
import { registry } from '../net';

import { MONITOR_REFRESH_DELAY } from './constants';
import continuousMonitor from './continuous-monitor';

import _debug from './debug';

const debug = _debug(__filename);

const { KEY } = STATUS;

export default async () => {
  try {
    const href = await registry(KEY);
    debug('href=', href);

    if (href) {
      continuousMonitor(href, MONITOR_REFRESH_DELAY);
    } else {
      // eslint-disable-next-line no-console
      console.error('Unable to find url to monitor.');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('*** ERROR *** Error monitoring server:', err);
  }
};
