import app from './app';
import { REGISTRY_PORT } from './constants';

import _debug from './debug';

const debug = _debug(__filename);

export default async () => {
  const server = app();

  server.listen(REGISTRY_PORT, () => {
    debug(`Registry server started on port:${REGISTRY_PORT}`);
  });
};
