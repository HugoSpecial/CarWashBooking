import { Application } from "express";
import cors, { CorsOptions } from "cors";

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'carwashbooking.vercel.app'];
const ACCEPTED_METHODS = ['POST', 'GET', 'DELETE', 'PUT', 'PATCH']

function setupCors(app: Application) {
  const acceptedOrigins = ACCEPTED_ORIGINS;
  const acceptedMethods = ACCEPTED_METHODS;

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: acceptedMethods,
    credentials: true
  };

  app.use(cors(corsOptions));
}

export default setupCors;