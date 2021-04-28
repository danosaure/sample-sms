import express from 'express';

import { REGISTRY_PATH } from './constants';
import router from './router';

export default () => {
  const app = express();

  app.use(REGISTRY_PATH, router());

  return app;
};
