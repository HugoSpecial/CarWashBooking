import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  public readonly statusCode: number;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export default AppError;
