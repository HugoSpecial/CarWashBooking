import { UserDocument } from "../../infrastructure/db/models/user.model.js";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTOs.js";
import UserRepository from "../repositories/UserRepository.js";
import { compare, hash } from "bcrypt";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(data: CreateUserDTO): Promise<UserDocument> {
    const hashedPassword = await hash(data.password, 10);

    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

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

  public async updateProfile(
    userId: string,
    data: UpdateUserDTO
  ): Promise<UserDocument | null> {
    return await this.userRepository.update(userId, data);
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<UserDocument | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("Invalid email");

    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await hash(newPassword, 10);

    return await this.userRepository.update(userId, {
      password: hashedPassword,
    });
  }
}

export default UserService;
