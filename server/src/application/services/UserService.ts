import { StatusCodes } from 'http-status-codes';
import { compare, hash } from 'bcrypt';

import { UserDocument } from '../../infrastructure/db/models/user.model.js';
import AppError from '../../infrastructure/errors/AppError.js';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from '../dtos/UserDTOs.js';
import UserRepository from '../repositories/UserRepository.js';
import { createAccessToken } from '../../infrastructure/http/security/jwt.js';

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

  public async login(data: LoginUserDTO): Promise<string> {
    const userExists = await this.findByEmail(data.email);

    if (!userExists) throw new AppError('Invalid email', StatusCodes.NOT_FOUND);

    const passwordMatch = await compare(data.password, userExists.password);

    if (!passwordMatch)
      throw new AppError('Incorrect password', StatusCodes.BAD_REQUEST);

    const accessToken = createAccessToken(userExists);

    return accessToken;
  }

  public async updateProfile(
    userId: string,
    data: UpdateUserDTO,
  ): Promise<UserDocument | null> {
    return await this.userRepository.update(userId, data);
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserDocument | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new AppError('Invalid email', StatusCodes.NOT_FOUND);

    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch)
      throw new AppError('Old password is incorrect', StatusCodes.BAD_REQUEST);

    const hashedPassword = await hash(newPassword, 10);

    return await this.userRepository.update(userId, {
      password: hashedPassword,
    });
  }
}

export default UserService;
