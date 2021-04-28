import { CONTENT_TYPES } from './constants';

export default (req, res, resource, status = 200) => res.status(status).type(CONTENT_TYPES.HAL).send(resource.toJSON());
