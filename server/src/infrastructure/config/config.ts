import { envSchema } from '../http/validations/env.schema.js';

import logger from '../logger/winstonLogger.js';

process.loadEnvFile();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error('❌ Invalid environment variables:', parsed.error);
  process.exit(1);
}

export const {
  PORT,
  MONGO_URL,
  ACCESS_TOKEN_SECRET_KEY,
  NODE_ENV,
  UPLOADCARE_SECRET_KEY,
  SALT_ROUNDS,
} = parsed.data;
