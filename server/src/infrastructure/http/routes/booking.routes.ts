import { Router } from 'express';
import BookingRepository from '../../../application/booking/implementation/BookingRepository.js';
import BookingService from '../../../application/booking/implementation/BookingService.js';
import BookingController from '../controllers/BookingController.js';
import validate from '../middlewares/validate.middleware.js';
import checkAuthentication from '../middlewares/auth.middleware.js';
import { createBookingSchema } from '../validations/booking.schema.js';

const bookingRouter = Router();

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

bookingRouter.post(
  '/bookings',
  checkAuthentication,
  validate(createBookingSchema),
  bookingController.create.bind(bookingController),
);

bookingRouter.get(
  '/bookings',
  checkAuthentication,
  bookingController.getAllBookings.bind(bookingController),
);

bookingRouter.get(
  '/bookings/:id',
  checkAuthentication,
  bookingController.getBookingById.bind(bookingController),
);

export default bookingRouter;
