import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import UserService from '../../../application/user/implementation/UserService.js';
import setTokenCookie from '../security/cookies.js';
import {
  CreateUserDTO,
  LoginUserDTO,
  RequestResetPasswordDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from '../validations/user.schema.js';
import logger from '../../logger/winstonLogger.js';

class UserController {
  constructor(private readonly userService: UserService) {}

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = req.body as CreateUserDTO;
    const photo = req.file;

    logger.info(`User registration attempt with email: ${data.email}`);

    try {
      const user = await this.userService.create(data, photo);

      logger.info(`User registered successfully: ${user.email}`);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(
        `User registration failed for email: ${data.email} - ${(error as Error).message}`,
      );
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = req.body as LoginUserDTO;
    logger.info(`Login attempt for email: ${data.email}`);

    try {
      const accessToken = await this.userService.login(data);
      setTokenCookie(accessToken, res);

      logger.info(`User logged in successfully: ${data.email}`);

      res.status(StatusCodes.OK).json({ message: 'Login successful' });
    } catch (error: any) {
      logger.error(`Login failed for email: ${data.email} - ${error.message}`);
      next(error);
    }
  }

  public async findAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    logger.info('Fetching all users');

    try {
      const users = await this.userService.findAll();

      logger.info(`Fetched ${users?.length} users`);

      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      logger.error(`Fetching all users failed - ${(error as Error).message}`);
      next(error);
    }
  }

  public logout(_req: Request, res: Response, next: NextFunction): void {
    logger.info('Logout attempt');

    try {
      res.clearCookie('accessToken');

      logger.info('Logout successful');

      res.status(StatusCodes.OK).json({
        message: 'Logout successful',
      });
    } catch (error) {
      logger.error(`Logout failed - ${(error as Error).message}`);
      next(error);
    }
  }

  public async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = req.user!.userId;

    const data = req.body as UpdateUserDTO;
    const photo = req.file;

    logger.info(`Update profile attempt for userId: ${userId}`);

    try {
      const updatedUser = await this.userService.updateProfile(
        userId,
        data,
        photo,
      );

      logger.info(`Profile updated successfully for userId: ${userId}`);

      res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
      logger.error(
        `Profile update failed for userId: ${userId} - ${(error as Error).message}`,
      );
      next(error);
    }
  }

  public async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = req.user!.userId;
    const { oldPassword, newPassword } = req.body as UpdatePasswordDTO;

    logger.info(`Password update attempt for userId: ${userId}`);

    try {
      await this.userService.changePassword(userId, oldPassword, newPassword);

      logger.info(`Password updated successfully for userId: ${userId}`);

      res.status(StatusCodes.OK).json({ message: 'Password updated.' });
    } catch (error) {
      logger.error(
        `Password update failed for userId: ${userId} - ${(error as Error).message}`,
      );
      next(error);
    }
  }

  public async getUserInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = req.user!.userId;

    logger.info(`Get user info request for userId: ${userId}`);

    try {
      const user = await this.userService.findById(userId);

      logger.info(`User info retrieved successfully for userId: ${userId}`);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(
        `Get user info failed for userId: ${userId} - ${(error as Error).message}`,
      );
      next(error);
    }
  }

  public async requestPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { email } = req.body as RequestResetPasswordDTO;

    try {
      await this.userService.requestPasswordReset(email);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Password reset email sent.' });
    } catch (error) {
      next(error);
    }
  }

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { token, newPassword } = req.body as ResetPasswordDTO;

    try {
      await this.userService.resetPassword(token, newPassword);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
