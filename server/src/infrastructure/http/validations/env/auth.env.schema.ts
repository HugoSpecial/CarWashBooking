import { z } from 'zod';

const authSchema = z.object({
  ACCESS_TOKEN_SECRET_KEY: z
    .string()
    .min(10, 'Must be a valid access token secret key.'),
  ACCESS_TOKEN_EXPIRE: z.string().regex(/^\d+$/).transform(Number),
  RESET_PASSWORD_SECRET_KEY: z
    .string()
    .min(10, 'Must be a valid reset password secret key.'),
  RESET_PASSWORD_EXPIRE: z.string().regex(/^\d+$/).transform(Number),
});

export default authSchema;
