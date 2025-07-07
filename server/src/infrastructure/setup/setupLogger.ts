import { Application } from 'express';
import morgan from 'morgan';
import logger from '../logger/winstonLogger.js';

function setupLogger(app: Application) {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }),
  );
}

export default setupLogger;
