import { BookingDocument } from '@/infrastructure/db/models/booking.model.js';
import { CreateBookingDTO } from '../../../infrastructure/http/validations/booking.schema.js';
import BookingRepository from './BookingRepository.js';
import NotFoundError from '@/infrastructure/errors/NotFoundError.js';
import BadRequestError from '@/infrastructure/errors/BadRequestError.js';
import UnauthorizedError from '@/infrastructure/errors/UnauthorizedError.js';

class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  public async create(
    data: CreateBookingDTO,
    userId: string,
  ): Promise<BookingDocument> {
    const booking = await this.bookingRepository.save({
      ...data,
      userId,
    });

    return booking;
  }

  public async getById(id: string): Promise<BookingDocument | null> {
    return await this.bookingRepository.findById(id);
  }

  public async getUserBookings(userId: string): Promise<BookingDocument[]> {
    const allBookings = await this.bookingRepository.findAll();

    return allBookings.filter(
      (booking) => booking.userId.toString() === userId,
    );
  }

  public async getAll(): Promise<BookingDocument[]> {
    return await this.bookingRepository.findAll();
  }

  public async cancelBooking(
    bookingId: string,
    userId: string,
  ): Promise<BookingDocument | null> {
    const booking = await this.getValidBooking(bookingId, userId);
    this.ensureCanBeCancelled(booking);

    return await this.bookingRepository.cancelBooking(bookingId);
  }

  // Helper: Find and validate booking ownership
  private async getValidBooking(bookingId: string, userId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new NotFoundError('Booking not found.');

    if (booking.userId.toString() !== userId) {
      throw new UnauthorizedError('You cannot cancel this booking!');
    }

    return booking;
  }

  // Helper: Ensure it can be cancelled
  private ensureCanBeCancelled(booking: BookingDocument): void {
    const dateString =
      booking.date instanceof Date
        ? booking.date.toISOString().split('T')[0]
        : booking.date;

    const bookingDate = new Date(`${dateString}T${booking.timeSlot}:00`);
    const now = new Date();

    const hoursBefore =
      (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursBefore < 2) {
      throw new BadRequestError(
        'Bookings can only be cancelled at least 2 hours in advance.',
      );
    }

    if (booking.status === 'cancelled') {
      throw new BadRequestError('Booking is already canceled.');
    }

    if (booking.status === 'completed') {
      throw new BadRequestError('You cannot cancel a completed booking.');
    }
  }
}
export default BookingService;
