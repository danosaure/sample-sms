import { v4 } from 'uuid';

import { CACHE_KEYS, inc } from './cache';
import { ingestMessages } from './ingest';

import _debug from './debug';

const debug = _debug(__filename);

const queue = [];

export const add = (messages) => {
  messages.forEach((message) => {
    // TODO: log new message received.

    queue.push({
      id: v4(),
      start: process.hrtime(),
      ...message,
    });

    inc(CACHE_KEYS.TOTAL);
  });
  debug('queue=', queue);

  ingestMessages();
};

export const pop = () => queue.shift();
