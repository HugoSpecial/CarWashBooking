import { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError.js';

const ACCEPTED_ORIGINS = ['http://localhost:5173', 'carwashbooking.vercel.app'];
const ACCEPTED_METHODS = ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'];

function setupCors(app: Application) {
  const acceptedOrigins = ACCEPTED_ORIGINS;
  const acceptedMethods = ACCEPTED_METHODS;

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new AppError('Not allowed by CORS', StatusCodes.FORBIDDEN));
      }
    },
    methods: acceptedMethods,
    credentials: true,
  };

  app.use(cors(corsOptions));
}

export default setupCors;
