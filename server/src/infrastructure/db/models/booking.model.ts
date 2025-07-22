import { model, Document, Schema, Types } from 'mongoose';

export interface BookingDocument extends Document {
  userId: Types.ObjectId;
  serviceType: string;
  date: Date;
  timeSlot: string;
  vehicleDetails: {
    make: string;
    model: string;
    plate: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const bookingSchema = new Schema<BookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    vehicleDetails: {
      make: String,
      model: String,
      plate: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const BookingModel = model<BookingDocument>('Booking', bookingSchema);

export default BookingModel;
