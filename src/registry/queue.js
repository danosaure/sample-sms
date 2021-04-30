import { v4 } from 'uuid';

import { CACHE_KEYS, inc } from './cache';
import { notify as notifySenders } from './senders';

import _debug from './debug';

const debug = _debug(__filename);

const queue = [];
const idsToSend = [];

export const add = (req, messages) => {
  messages.forEach((message) => {
    // TODO: log new message received.
    //
    const id = v4();

    queue.push({
      id,
      start: process.hrtime(),
      ...message,
    });

    idsToSend.push(id);

    inc(CACHE_KEYS.TOTAL);
  });
  debug('queue=', queue);

  // This is async, but we don't need to know it's done.
  notifySenders(req);
};

export const hasMessages = () => Boolean(queue.length);

export const popId = () => idsToSend.shift();

export const byId = (id) => queue.find((message) => message.id === id);
