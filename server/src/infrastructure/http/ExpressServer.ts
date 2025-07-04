import express, { Application, json, Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import setupMorgan from '../setup/setupMorgan.js';
import setupCors from '../setup/setupCors.js';
import MongoService from '../db/connection.js';
import userRouter from './routes/user.routes.js';

process.loadEnvFile();

/**
 * Configure express server
 */
class ExpressServer {
  private app: Application;

  private readonly mongoConnectionHandler: MongoService;

  constructor(mongoHandler?: MongoService) {
    this.app = express();

    this.app.disable('x-powered-by');

    this.mongoConnectionHandler = mongoHandler || new MongoService()

    this.initMiddlewares();

    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(json());

    this.app.use(helmet());

    this.app.use(cookieParser());

    setupMorgan(this.app);

    setupCors(this.app);
  }

  private initRoutes() {
    const router = Router();

    router.get('/health-check', (_: Request, res: Response) => {
      res.status(StatusCodes.OK).send('Hello World!');
    })

    this.app.use(router, userRouter);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log('Server running')
    })
  }
}

export default ExpressServer;