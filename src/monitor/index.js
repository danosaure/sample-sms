import { STATUS } from '../api';
import { REGISTRY_URL } from '../constants';
import { getHal } from '../net';
import { getLinkHref } from '../utils';

import { MONITOR_REFRESH_DELAY } from './constants';
import continuousMonitor from './continuous-monitor';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { KEY } = STATUS;

export default async () => {
  try {
    const res = await getHal(REGISTRY_URL);
    if (res.ok) {
      const { body } = res;
      const href = getLinkHref(body, KEY);
      if (href) {
        continuousMonitor(href, MONITOR_REFRESH_DELAY);
      } else {
        throw new Error(`Cannot find "${KEY}" link on registry.`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Error registry:', res.body);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('*** ERROR *** Error connecting to registry:', err);
  }
};
