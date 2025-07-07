import { Application } from 'express';
import morgan from 'morgan';

import { NODE_ENV } from '../config/config.js';

function setupMorgan(app: Application) {
  const loggerFormat = NODE_ENV === 'development' ? 'dev' : 'common';

  app.use(morgan(loggerFormat));
}

export default setupMorgan;
