import { z } from 'zod';

const mailSchema = z.object({
  MAIL_HOST: z.string().min(1),
  MAIL_PORT: z.string().regex(/^\d+$/).transform(Number),
  MAIL_SECURE: z.enum(['true', 'false']),
  MAIL_USER: z.string().min(1),
  MAIL_PASS: z.string().min(1),
  MAIL_FROM: z.string().email(),
});

export default mailSchema;
