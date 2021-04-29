/* eslint-disable import/prefer-default-export */

import { envNumber } from '../utils';

export const MONITOR_REFRESH_DELAY = envNumber('MONITOR_REFRESH_DELAY', 5);
