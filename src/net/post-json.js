import fetch from 'node-fetch';

import { CONTENT_TYPES, HEADERS } from './constants';

export default async (url, json) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        [HEADERS.ACCEPT]: CONTENT_TYPES.HAL,
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
      },
      body: JSON.stringify(json),
    });

    return {
      ok: res.ok,
      status: res.status,
      body: res.ok ? await res.json() : await res.text(),
    };
  } catch (err) {
    throw new Error(`*** POST ERROR ${url} ***: ${err.message}.`);
  }
};
