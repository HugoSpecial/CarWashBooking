import jwt from 'jsonwebtoken';

import { UserDocument } from '../../db/models/user.model.js';
import { ACCESS_TOKEN_SECRET_KEY } from '../../config/config.js';

function createAccessToken(user: UserDocument): string {
  return jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });
}

export { createAccessToken };
