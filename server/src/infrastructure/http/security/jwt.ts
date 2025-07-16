import jwt from 'jsonwebtoken';

import { UserRole } from '../../db/models/user.model.js';
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET_KEY,
  RESET_PASSWORD_EXPIRE,
  RESET_PASSWORD_SECRET_KEY,
} from '../../config/config.js';

function createPasswordResetToken(userId: string): string {
  return jwt.sign({ userId }, RESET_PASSWORD_SECRET_KEY, {
    expiresIn: RESET_PASSWORD_EXPIRE,
  });
}

function verifyPasswordResetToken(token: string): { userId: string } {
  return jwt.verify(token, RESET_PASSWORD_SECRET_KEY) as { userId: string };
}

function createAccessToken(userId: string, role: UserRole): string {
  return jwt.sign({ userId, role }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
}

export {
  createAccessToken,
  createPasswordResetToken,
  verifyPasswordResetToken,
};
