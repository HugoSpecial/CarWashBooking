import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserService from '../../../application/services/UserService.js';
import UserRepository from '../../../application/repositories/UserRepository.js';
import { ACCESS_TOKEN_SECRET_KEY } from '../../config/config.js';
import { UserRole } from '../../db/models/user.model.js';
import UnathorizedError from '../../errors/UnathorizedError.js';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

async function checkAuthentication(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) throw new UnathorizedError('You are not logged in!');

    const decoded = jwt.verify(
      accessToken as string,
      ACCESS_TOKEN_SECRET_KEY,
    ) as { userId: string; role: UserRole };

    if (!decoded)
      throw new UnathorizedError('You do not have access to this resource!');

    const user = await userService.findById(decoded.userId);

    if (!user) throw new UnathorizedError('Invalid user!');

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export default checkAuthentication;
