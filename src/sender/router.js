import bodyParser from 'body-parser';
import express from 'express';

import { PATHS } from './constants';
import notify from './notify';

export default () => {
  const router = new express.Router();

  router.post(`/${PATHS.NOTIFY}`, bodyParser.json(), notify);

  return router;
};
