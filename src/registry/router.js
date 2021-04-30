import bodyParser from 'body-parser';
import express from 'express';

import { PATHS } from './constants';
import listServices from './list-services';
import popMessage from './pop-message';
import registerSender from './register-sender';
import sendSms from './send-sms';
import sendingStatus from './sending-status';
import status from './status';

export default () => {
  const router = new express.Router();

  router.get('/', listServices);
  router.post(`/${PATHS.POP_MESSAGE}`, bodyParser.json(), popMessage);
  router.post(`/${PATHS.SEND_SMS}`, bodyParser.json(), sendSms);
  router.post(`/${PATHS.SENDING_STATUS}`, bodyParser.json(), sendingStatus);
  router.get(`/${PATHS.STATUS}`, status);
  router.post(`/${PATHS.REGISTER_SENDER}`, bodyParser.json(), registerSender);

  return router;
};
