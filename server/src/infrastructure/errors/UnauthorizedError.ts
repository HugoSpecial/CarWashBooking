import { StatusCodes } from 'http-status-codes';

import AppError from './AppError.js';

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthorizedError;
