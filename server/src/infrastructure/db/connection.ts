import mongoose, { Connection, MongooseError } from 'mongoose';

import logger from '../logger/winstonLogger.js';
import AppError from '../errors/AppError.js';
import { StatusCodes } from 'http-status-codes';

class MongoService {
  private connection: Connection | null = null;

  private connected = false;

  public isConnected(): boolean {
    return this.connected;
  }

  public async connect(): Promise<void> {
    if (this.isConnected()) {
      logger.warn('MongoDB already connected');
      return;
    }

    const url = process.env.MONGO_URL;

    if (!url) {
      throw new AppError(
        'MONGO_URL environment variable is not set',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      mongoose.connection.on('connected', () => {
        this.connected = true;
        logger.info('Conected to MongoDB');
      });

      mongoose.connection.on('error', (error: MongooseError) => {
        logger.error('Error connecting to MongoDB', error);
        throw error;
      });

      mongoose.connection.on('disconnected', () => {
        this.connected = false;
        logger.warn('MongoDB connection lost');
      });

      await mongoose.connect(url);

      this.connection = mongoose.connection;
    } catch (error) {
      logger.error('MongoDB connection failed', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();

      this.connected = false;
      this.connection = null;

      logger.info('MongoDB connection closed');
    } catch (error) {
      logger.error('Failed to close connection');
      throw error;
    }
  }
}

export default MongoService;
