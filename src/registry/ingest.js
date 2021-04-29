import { get as getSender } from './senders';

import _debug from './debug';

const debug = _debug(__filename);

export default async () => {
  debug('need start ingesting queue...');
};

export const ingestMessages = async () => {
  const sender = getSender();
  if (sender) {
    debug('need to get message to send.');
  }
};
