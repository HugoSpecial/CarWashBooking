import { z } from 'zod';

export const sharedSchema = z.object({
  PORT: z.string().regex(/^\d+$/).default('5000').transform(Number),
  MONGO_URL: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  SALT_ROUNDS: z.string().regex(/^\d+$/).default('10').transform(Number),
});
