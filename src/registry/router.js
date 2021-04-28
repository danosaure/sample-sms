import express from 'express';

import listServices from './list-services';

export default () => {
  const router = new express.Router();

  router.get('/', listServices);

  return router;
};
