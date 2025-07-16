import { z } from 'zod';
import { sharedSchema } from './shared.env.schema.js';
import authSchema from './auth.env.schema.js';
import mailSchema from './mail.env.schema.js';
import uploadcareSchema from './uploadcare.env.schema.js';

export const envSchema = sharedSchema
  .merge(authSchema)
  .merge(mailSchema)
  .merge(uploadcareSchema);

export type EnvSchema = z.infer<typeof envSchema>;
