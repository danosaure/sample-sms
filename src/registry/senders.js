import Promise from 'bluebird';
import { v4 } from 'uuid';

import _debug from './debug';

const debug = _debug(__filename);

const senders = [];

export const get = () => senders.shift();
export const add = (url) => {
  const id = v4();
  const sender = { id, url };
  senders.push(sender);
  return id;
};

export const notify = async () => {
  await Promise.each(
    senders,
    async (sender) => {
      debug('sending to sender=', sender);
    },
  );
};
