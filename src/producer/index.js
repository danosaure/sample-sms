import { REGISTRY_URL } from '../constants';
import { getHal } from '../server';
import { getLinkHref } from '../utils';

import _debug from './debug';

const debug = _debug(__filename);

export default async () => {
  try {
    const res = await getHal(REGISTRY_URL);
    debug('res=', res);
    if (res.ok) {
      const { body } = res;
      const href = getLinkHref(body, 'send-sms');
      if (href) {
        debug('href=', href);
      } else {
        throw new Error('Cannot find "send-sms" link on registry.');
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
