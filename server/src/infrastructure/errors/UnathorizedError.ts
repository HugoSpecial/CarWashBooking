import { StatusCodes } from 'http-status-codes';

import AppError from './AppError.js';

class UnathorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnathorizedError;
