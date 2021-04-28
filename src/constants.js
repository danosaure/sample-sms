/* eslint-disable import/prefer-default-export */

import { envString } from './utils';

import { REGISTRY_PATH, REGISTRY_PORT } from './registry/constants';

export const REGISTRY_URL = envString('REGISTRY_URL', `http://localhost:${REGISTRY_PORT}${REGISTRY_PATH}`);
