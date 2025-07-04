import { Application } from "express";
import morgan from 'morgan';

function setupMorgan(app: Application) {
  const loggerFormat = process.env.NODE_ENV === 'development' ? 'dev' : 'common'

  app.use(morgan(loggerFormat));
}

export default setupMorgan;
