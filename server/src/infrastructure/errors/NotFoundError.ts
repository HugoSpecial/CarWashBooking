import { StatusCodes } from 'http-status-codes';

import AppError from './AppError.js';

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
