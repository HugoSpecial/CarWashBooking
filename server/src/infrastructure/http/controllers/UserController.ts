import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateUserDTO,
  LoginUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from '../../../application/dtos/UserDTOs.js';
import UserService from '../../../application/services/UserService.js';
import setTokenCookie from '../security/cookies.js';

class UserController {
  constructor(private readonly userService: UserService) {}

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = req.body as CreateUserDTO;

    try {
      const user = await this.userService.create(data);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = req.body as LoginUserDTO;

    try {
      const accessToken = await this.userService.login(data);

      setTokenCookie(accessToken, res);

      res.status(StatusCodes.OK).json({ message: 'Login successful' });
    } catch (error: any) {
      next(error);
    }
  }

  public async findAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await this.userService.findAll();

      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  public logout(_req: Request, res: Response, next: NextFunction): void {
    try {
      res.clearCookie('accessToken');

      res.status(StatusCodes.OK).json({
        message: 'Logout successful',
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = req.user!.userId;

    const { name, email, photo } = req.body as UpdateUserDTO;

    try {
      const updatedUser = await this.userService.updateProfile(userId, {
        name,
        email,
        photo,
      });

      res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
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

    try {
      await this.userService.changePassword(userId, oldPassword, newPassword);

      res.status(StatusCodes.OK).json({ message: 'Password updated.' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
