import { envNumber, envString } from '../utils';

export const REGISTRY_PORT = envNumber('REGISTRY_PORT', 9000);
export const REGISTRY_PATH = envString('REGISTRY_PATH', '/registry');
