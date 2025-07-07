import UserModel, {
  UserDocument,
} from '../../infrastructure/db/models/user.model.js';
import { CreateUserDTO } from '../../infrastructure/http/validations/user.schema.js';

class UserRepository {
  public async save(data: CreateUserDTO): Promise<UserDocument> {
    const user = new UserModel(data);

    return await user.save();
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const user = UserModel.findOne({ email: email });

    return user;
  }

  public async findById(id: string): Promise<UserDocument | null> {
    const user = UserModel.findById(id);

    return user;
  }

  public async findAll(): Promise<UserDocument[] | null> {
    const users = UserModel.find();

    return users;
  }

  public async update(
    userId: string,
    updateData: Partial<UserDocument>,
  ): Promise<UserDocument | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  }
}

export default UserRepository;
