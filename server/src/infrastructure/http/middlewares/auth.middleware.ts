import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserService from "../../../application/services/UserService.js";
import UserRepository from "../../../application/repositories/UserRepository.js";
import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

async function checkAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) throw new Error("You are not logged in!");

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    ) as { userId: string };

    if (!decoded) throw new Error("Unathorized");

    const user = await userService.findById(decoded.userId);

    if (!user) throw new Error("Invalid user!");

    (req as any).user = user;

    next();
  } catch (error) {
    console.error("Error occurred while verifying authentication.", error);

    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error occurred while verifying authentication.",
      });
    }
  }
}

export default checkAuthentication;
