import bodyParser from 'body-parser';
import express from 'express';

import { PATHS } from './constants';
import listServices from './list-services';
import sendSms from './send-sms';

export default () => {
  const router = new express.Router();

  router.get('/', listServices);
  router.post(`/${PATHS.SEND_SMS}`, bodyParser.json(), sendSms);

  return router;
};
