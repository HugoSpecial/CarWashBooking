import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import BookingService from '../../../application/booking/implementation/BookingService.js';
import { CreateBookingDTO } from '../validations/booking.schema.js';

class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data = req.body as CreateBookingDTO;
    const userId = req.user?.userId as string;

    try {
      const booking = await this.bookingService.create(data, userId);

      res.status(StatusCodes.OK).json({ message: 'Booking created.', booking });
    } catch (error) {
      next(error);
    }
  }

  public async getAllBookings(
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookings = await this.bookingService.getAll();

      res.status(StatusCodes.OK).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  public async getBookingById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const bookingId = req.params.id;

    try {
      const booking = await this.bookingService.getById(bookingId);

      res.status(StatusCodes.OK).json(booking);
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
