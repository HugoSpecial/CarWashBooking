import { z } from 'zod';

const uploadcareSchema = z.object({
  UPLOADCARE_SECRET_KEY: z.string().min(1),
});

export default uploadcareSchema;
