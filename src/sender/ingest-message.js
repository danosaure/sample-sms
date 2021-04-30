import { POP_MESSAGE } from '../api';
import { postJson } from '../net';

import { getSenderId } from './cache';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM } = POP_MESSAGE;

export default async (url) => {
  debug('should ingest message from url=', url);

  const id = getSenderId();

  try {
    // NOTE: Ideally, we would set the id in a header, and use a GET call.
    const res = await postJson(url, {
      [FORM.ID.KEY]: id,
    });
    if (res.ok) {
      debug('res=', res);
    } else {
      // eslint-disable-next-line no-console
      console.error('error fetching message.');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error fetching message:', err);
  }
};
