import { StatusCodes } from 'http-status-codes';

import AppError from './AppError.js';

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
