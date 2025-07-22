import { z } from 'zod';

export const createBookingSchema = z.object({
  serviceType: z.string().min(1),
  date: z.string(),
  timeSlot: z.string().min(1),
  vehicleDetails: z.object({
    make: z.string(),
    model: z.string(),
    plate: z.string(),
  }),
});

export type CreateBookingDTO = z.infer<typeof createBookingSchema> & {
  userId: string;
};
