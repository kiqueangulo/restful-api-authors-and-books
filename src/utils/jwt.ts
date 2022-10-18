import jwt from 'jsonwebtoken';

import { config } from '../config/config';

export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, config.keys.private, { ...(options && options), algorithm: 'RS256' });
}
