import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import MongoService from '../db/connection.js';
import logger from '../logger/winstonLogger.js';
import AppError from '../errors/AppError.js';

class SetupHealthCheck {
  constructor(private readonly mongoConnection: MongoService) {}

  public async check(_req: Request, res: Response) {
    try {
      const [dbStatus] = await Promise.all([this.checkDatabase()]);

      res.status(StatusCodes.OK).json({
        status: 'healthy',
        mongoConnection: dbStatus,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Health check failed:', error);
      throw new AppError(
        'Service unavailable',
        StatusCodes.SERVICE_UNAVAILABLE,
      );
    }
  }

  private checkDatabase(): boolean {
    try {
      const isConnected = this.mongoConnection.isConnected();

      if (isConnected) {
        logger.debug('MongoDB connection verified.');

        return true;
      }

      logger.warn('MongoDB is not connected');

      return false;
    } catch (error) {
      logger.error('MongoDB connection check failed:', error);

      return false;
    }
  }
}

export default SetupHealthCheck;
