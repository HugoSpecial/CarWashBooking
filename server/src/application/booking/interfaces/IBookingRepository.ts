import { BookingDocument } from '../../../infrastructure/db/models/booking.model.js';
import { CreateBookingDTO } from '../../../infrastructure/http/validations/booking.schema.js';

interface IBookingRepository {
  save(data: CreateBookingDTO): Promise<BookingDocument>;
  findById(id: string): Promise<BookingDocument | null>;
  findAll(): Promise<BookingDocument[] | null>;
}

export default IBookingRepository;
