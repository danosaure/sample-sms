import { REGISTER_SENDER } from '../api';
import { postJson, registry } from '../net';

import app from './app';

import _debug from './debug';

const debug = _debug(__filename);

const { KEY } = REGISTER_SENDER;

const close = (listener) => {
  // eslint-disable-next-line no-console
  console.error('Unable to register sender.');
  listener.close();
};

export default async () => {
  const server = app();

  const listener = server.listen(0);
  debug(`Registry server started on port:${listener.address().port}`);

  const senderRegisterUrl = await registry(KEY);
  debug('senderRegisterUrl=', senderRegisterUrl);
  if (senderRegisterUrl) {
    const registrationRes = await postJson(senderRegisterUrl, {
      foo: 'bar',
    });
    if (registrationRes.ok) {
      debug('registrationRes=', registrationRes);
      debug('Ready to process...');
    } else {
      close(listener);
    }
  } else {
    close(listener);
  }
};
