import jwt from 'jsonwebtoken';
import { UserDocument } from '../../db/models/user.model.js';

function createAccessToken(user: UserDocument): string {
  return jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET_KEY as string,
    { expiresIn: '1h' },
  );
}

export { createAccessToken };
