import express from 'express';

import { SENDER_PATH } from './constants';
import router from './router';

export default () => {
  const app = express();

  app.use(SENDER_PATH, router());

  return app;
};
