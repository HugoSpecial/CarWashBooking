import { z } from 'zod';

export const envSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT must be a number.')
    .default('5000')
    .transform(Number),

  MONGO_URL: z.string().min(1, 'Must be a valid MongoDB URL.'),

  ACCESS_TOKEN_SECRET_KEY: z
    .string()
    .min(10, 'Must be a valid access token secret key.'),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export type EnvSchema = z.infer<typeof envSchema>;
