import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserService from '../../../application/services/UserService.js';
import UserRepository from '../../../application/repositories/UserRepository.js';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError.js';
import { ACCESS_TOKEN_SECRET_KEY } from '../../config/config.js';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken)
      throw new AppError('You are not logged in!', StatusCodes.UNAUTHORIZED);

    const decoded = jwt.verify(
      accessToken as string,
      ACCESS_TOKEN_SECRET_KEY,
    ) as { userId: string };

    if (!decoded)
      throw new AppError(
        'You do not have access to this!',
        StatusCodes.UNAUTHORIZED,
      );

    const user = await userService.findById(decoded.userId);

    if (!user) throw new AppError('Invalid user!', StatusCodes.UNAUTHORIZED);

    (req as any).user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default checkAuthentication;
