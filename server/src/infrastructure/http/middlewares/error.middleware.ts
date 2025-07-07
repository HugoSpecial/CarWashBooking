import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError.js';

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
}

export default errorHandler;
