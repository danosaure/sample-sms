import { STATUS } from '../api';
import { getHal } from '../net';

// import _debug from './debug';
//
// const debug = _debug(__filename);

const { RESULT } = STATUS;

export default async (href) => {
  // debug('starting... href=', href);
  const messages = [
    '',
    '--------------------------------------------------',
    (new Date()).toString(),
  ];

  try {
    const res = await getHal(href);
    // debug('res=', res);

    if (res.ok) {
      const { body } = res;
      // debug('body=', body);

      const total = body[RESULT.TOTAL];
      messages.push(`TOTAL: ${total}`);

      const successful = body[RESULT.SUCCESSFUL];
      messages.push(`SUCCESS: ${total ? successful : '-'}`);
      messages.push(`FAILED: ${total ? body[RESULT.FAILED] : '-'}`);

      const attempts = body[RESULT.ATTEMPTS];
      const processTime = body[RESULT.PROCESS_TIME];
      messages.push(`AVERAGE TIME: ${total && attempts ? `${Math.round(processTime / attempts)}ms` : '-'}`);

      messages.push(`SUCCESS RATIO: ${total && attempts ? `${Math.round((successful * 100) / attempts)}%` : '-'}`);
    } else {
      messages.push('Invalid response.');
    }
  } catch (err) {
    messages.push(`Connection error: ${err.message}`);
  } finally {
    // eslint-disable-next-line no-console
    console.log(messages.join('\n'));
  }
};
