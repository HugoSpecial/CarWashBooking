import { envSchema } from '../http/validations/env/env.schema.js';

import logger from '../logger/winstonLogger.js';

process.loadEnvFile();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error('❌ Invalid environment variables:', parsed.error);
  process.exit(1);
}

export const {
  PORT,
  NODE_ENV,
  MONGO_URL,
  ACCESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRE,
  RESET_PASSWORD_EXPIRE,
  RESET_PASSWORD_SECRET_KEY,
  UPLOADCARE_SECRET_KEY,
  SALT_ROUNDS,
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
} = parsed.data;
