import Promise from 'bluebird';

import _debug from './debug';

const debug = _debug(__filename);

const senders = [];

export const get = () => senders.shift();
export const add = (sender) => senders.push(sender);

export const notify = async () => {
  await Promise.each(
    senders,
    async (sender) => {
      debug('sending to sender=', sender);
    },
  );
};
