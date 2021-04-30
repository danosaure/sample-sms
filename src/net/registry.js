import { REGISTRY_URL } from '../constants';
import { getLinkHref } from '../utils';

import getHal from './get-hal';

import _debug from './debug';

const debug = _debug(__filename);

export default async (key) => {
  try {
    const res = await getHal(REGISTRY_URL);
    // debug('res=', res);

    if (res.ok) {
      const { body } = res;
      return getLinkHref(body, key);
    }
    debug('Error registry:', res.body);
    return null;
  } catch (err) {
    return null;
  }
};
