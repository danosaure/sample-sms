import app from './app';
import register from './register';

import _debug from './debug';

const debug = _debug(__filename);

export default async () => {
  const server = app();

  const listener = server.listen(0);
  const senderPort = listener.address().port;
  debug(`Registry server started on port:${senderPort}`);

  await register(listener);
};
