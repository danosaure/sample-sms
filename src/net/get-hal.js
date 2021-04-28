import fetch from 'node-fetch';

import { CONTENT_TYPES, HEADERS } from './constants';

export default async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      [HEADERS.ACCEPT]: CONTENT_TYPES.HAL,
    },
  });

  return {
    ok: res.ok,
    status: res.status,
    body: res.ok ? await res.json() : await res.text(),
  };
};
