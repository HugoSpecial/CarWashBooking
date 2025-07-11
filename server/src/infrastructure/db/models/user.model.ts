import { model, Document, Schema } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: UserRole;
}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: String,
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
