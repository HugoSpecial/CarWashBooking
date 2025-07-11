import { UserDocument } from '../../../infrastructure/db/models/user.model.js';
import { CreateUserDTO } from '../../../infrastructure/http/validations/user.schema.js';

interface IUserRepository {
  save(data: CreateUserDTO): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  findAll(): Promise<UserDocument[] | null>;
  update(
    userId: string,
    updateData: Partial<UserDocument>,
  ): Promise<UserDocument | null>;
}

export default IUserRepository;
