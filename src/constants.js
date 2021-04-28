import { envString } from './utils';

import { REGISTRY_PATH, REGISTRY_PORT } from './registry/constants';

export const REGISTRY_URL = envString('REGISTRY_URL', `http://localhost:${REGISTRY_PORT}${REGISTRY_PATH}`);

export const HAL_CONTENT_TYPE = 'application/hal+json';
