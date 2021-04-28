import fetch from 'node-fetch';

import { HAL_CONTENT_TYPE } from '../constants';

export default async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: HAL_CONTENT_TYPE,
    },
  });

  return {
    ok: res.ok,
    status: res.status,
    body: res.ok ? await res.json() : await res.text(),
  };
};
