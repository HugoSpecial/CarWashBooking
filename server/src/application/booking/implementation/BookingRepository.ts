import BookingModel, {
  BookingDocument,
} from '../../../infrastructure/db/models/booking.model.js';
import { CreateBookingDTO } from '../../../infrastructure/http/validations/booking.schema.js';
import IBookingRepository from '../interfaces/IBookingRepository.js';

class BookingRepository implements IBookingRepository {
  public async save(data: CreateBookingDTO): Promise<BookingDocument> {
    const booking = new BookingModel(data);

    return await booking.save();
  }

  public async findById(id: string): Promise<BookingDocument | null> {
    const booking = await BookingModel.findById(id);

    return booking;
  }

  public async findAll(): Promise<BookingDocument[]> {
    const bookings = await BookingModel.find();

    return bookings;
  }

  public async cancelBooking(id: string): Promise<BookingDocument | null> {
    return BookingModel.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true },
    );
  }
}

export default BookingRepository;
