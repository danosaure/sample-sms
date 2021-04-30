import Promise from 'bluebird';
import { v4 } from 'uuid';

import { NOTIFY_SENDER } from '../api';
import { postJson } from '../net';
import { uriPath } from '../utils';

import { PATHS, REGISTRY_PATH } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

const senders = [];

const { FORM } = NOTIFY_SENDER;

export const get = () => senders.shift();

export const add = (url) => {
  const id = v4();

  // FIXME: Convert to a class
  const sender = {
    id,
    url,
    active: true,
    registered: new Date(),
  };
  senders.push(sender);
  debug('Added new sender. senders=', senders);
  return id;
};

const unregister = (sender) => {
  debug('Error... unregistering sender.');
  // eslint-disable-next-line no-param-reassign
  sender.unregistered = new Date();
  // eslint-disable-next-line no-param-reassign
  sender.active = false;
};

export const notify = async (req) => {
  const url = uriPath(req, `${REGISTRY_PATH}/${PATHS.POP_MESSAGE}`);

  debug('notify(): senders:', senders.length);

  await Promise.each(
    senders,
    async (sender) => {
      debug('sending to sender=', sender);

      if (!sender.active) {
        return;
      }

      try {
        // NOTE: If was MQ, it would also send a topic to be handled.
        const res = await postJson(sender.url, {
          [FORM.URL.KEY]: url,
        });
        if (!res.ok) {
          unregister(sender);
        }
      } catch (err) {
        unregister(sender);
      }
    },
  );
};
