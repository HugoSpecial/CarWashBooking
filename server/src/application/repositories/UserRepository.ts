import UserModel, { UserDocument } from "../../infrastructure/db/models/user.model.js";
import { CreateUserDTO } from "../dtos/UserDTOs.js";

class UserRepository {
  public async save(data: CreateUserDTO): Promise<UserDocument> {
    const user = new UserModel(data);

    return await user.save();
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const user = UserModel.findOne({ email: email })

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
}

export default UserRepository;