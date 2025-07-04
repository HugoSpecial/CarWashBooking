import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import {
  CreateUserDTO,
  LoginUserDTO,
} from "../../../application/dtos/UserDTOs.js";
import UserService from "../../../application/services/UserService.js";
import { createAccessToken } from "../security/jwt.js";
import setTokenCookie from "../security/cookies.js";

class UserController {
  constructor(private readonly userService: UserService) {}

  public async create(req: Request, res: Response): Promise<void> {
    const data = req.body as CreateUserDTO;

    try {
      const user = await this.userService.create(data);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      console.error("Error occurred while creating an user.", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error occurred while creating an user.",
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const data = req.body as LoginUserDTO;

    try {
      const userExists = await this.userService.findByEmail(data.email);

      if (!userExists) throw new Error("Invalid email");

      const passwordMatch = await bcrypt.compare(
        data.password,
        userExists.password
      );

      if (!passwordMatch) throw new Error("Incorret password");

      const accessToken = createAccessToken(userExists);

      setTokenCookie(accessToken, res);

      res.status(StatusCodes.OK).json({ message: "Login successful" });
    } catch (error: any) {
      console.error("Error occurred while logging in.", error);

      if (error instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error occurred while logging in.",
        });
      }
    }
  }

  public async findAll(_: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();

      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      console.error("Error occurred while obtaining all users.", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error occurred while obtaining all users.",
      });
    }
  }

  public async logout(_: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("accessToken");

      res.status(StatusCodes.OK).json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Error occurred while logging out.", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error occurred while logging out",
      });
    }
  }
}

export default UserController;
