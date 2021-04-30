import { REGISTER_SENDER } from '../api';
import { postJson, registry } from '../net';

import { setSenderId } from './cache';
import { PATHS, SENDER_PATH } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

const { FORM, KEY, RESULT } = REGISTER_SENDER;

const close = (listener) => {
  // eslint-disable-next-line no-console
  console.error('Unable to register sender.');
  listener.close();
};

export default async (listener) => {
  // TODO: Put below in other file.
  const senderRegisterUrl = await registry(KEY);
  debug('senderRegisterUrl=', senderRegisterUrl);
  if (senderRegisterUrl) {
    const senderPort = listener.address().port;
    // FIXME: This should be constructed.
    const url = `http://localhost:${senderPort}${SENDER_PATH}/${PATHS.NOTIFY}`;
    debug('url=', url);

    try {
      const registrationRes = await postJson(senderRegisterUrl, { [FORM.URL.KEY]: url });
      if (registrationRes.ok) {
        const { body } = registrationRes;
        setSenderId(body[RESULT.ID]);
        debug('Ready to process...');
      } else {
        close(listener);
      }
    } catch (err) {
      close(listener);
    }
  } else {
    close(listener);
  }
};
