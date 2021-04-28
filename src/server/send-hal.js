import { HAL_CONTENT_TYPE } from '../constants';

export default (req, res, resource, status = 200) => res.status(status).type(HAL_CONTENT_TYPE).send(resource.toJSON());
