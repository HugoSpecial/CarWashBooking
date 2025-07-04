import { UserDocument } from "../../infrastructure/db/models/user.model.js";
import { CreateUserDTO } from "../dtos/UserDTOs.js";
import UserRepository from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(data: CreateUserDTO): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword
    })

    return user;
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }

  public async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  public async findAll(): Promise<UserDocument[] | null> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export default UserService;
