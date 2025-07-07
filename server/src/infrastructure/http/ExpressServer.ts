import express, { Application, json, Router } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import setupMorgan from '../setup/setupMorgan.js';
import setupCors from '../setup/setupCors.js';
import SetupHealthCheck from '../setup/SetupHealthCheck.js';
import MongoService from '../db/connection.js';
import userRouter from './routes/user.routes.js';
import setupLogger from '../setup/setupLogger.js';
import errorHandler from './middlewares/error.middleware.js';
import logger from '../logger/winstonLogger.js';

import { PORT } from '../config/config.js';

/**
 * Configure express server
 */
class ExpressServer {
  private app: Application;

  private readonly mongoConnectionHandler: MongoService;

  constructor(mongoHandler?: MongoService) {
    this.app = express();

    this.app.disable('x-powered-by');

    this.mongoConnectionHandler = mongoHandler || new MongoService();

    this.initMiddlewares();

    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(json());

    this.app.use(helmet());

    this.app.use(cookieParser());

    setupMorgan(this.app);

    setupCors(this.app);

    setupLogger(this.app);

    this.app.use(errorHandler);
  }

  private initRoutes() {
    const router = Router();

    const healthMonitoring = new SetupHealthCheck(this.mongoConnectionHandler);

    router.get('/health-check', healthMonitoring.check.bind(healthMonitoring));

    this.app.use('/api/v1', router, userRouter);
  }

  public listen() {
    this.app.listen(PORT, () => {
      logger.info('Server running');
    });
  }
}

export default ExpressServer;
