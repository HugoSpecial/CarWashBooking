import { compare, hash } from 'bcrypt';

import { UserDocument } from '../../../infrastructure/db/models/user.model.js';
import UserRepository from './UserRepository.js';
import {
  createAccessToken,
  createPasswordResetToken,
  verifyPasswordResetToken,
} from '../../../infrastructure/http/security/jwt.js';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from '../../../infrastructure/http/validations/user.schema.js';
import BadRequestError from '../../../infrastructure/errors/BadRequestError.js';
import NotFoundError from '../../../infrastructure/errors/NotFoundError.js';
import UploadcareService from '../../../infrastructure/external-services/UploadcareService.js';
import { SALT_ROUNDS } from '../../../infrastructure/config/config.js';
import MailerService from '../../../infrastructure/external-services/MailService.js';

class UserService {
  private readonly uploadcareService: UploadcareService;
  private readonly mailService: MailerService;

  constructor(private readonly userRepository: UserRepository) {
    this.uploadcareService = new UploadcareService();
    this.mailService = new MailerService();
  }

  public async create(
    data: CreateUserDTO,
    photo?: Express.Multer.File,
  ): Promise<UserDocument> {
    const hashedPassword = await hash(data.password, SALT_ROUNDS);

    let photoUrl: string | undefined;

    if (photo) {
      const fileInfo = await this.uploadcareService.uploadFile(
        photo.buffer,
        photo.originalname,
      );

      photoUrl = fileInfo.cdnUrl;
    }

    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
      ...(photoUrl && { photo: photoUrl }),
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

    if (!userExists) throw new NotFoundError('Invalid email.');

    const passwordMatch = await compare(data.password, userExists.password);

    if (!passwordMatch) throw new BadRequestError('Incorrect password.');

    const accessToken = createAccessToken(
      String(userExists._id),
      userExists.role,
    );

    return accessToken;
  }

  public async updateProfile(
    userId: string,
    data: UpdateUserDTO,
    photo?: Express.Multer.File,
  ): Promise<UserDocument | null> {
    let photoUrl: string | undefined;

    if (photo) {
      const fileInfo = await this.uploadcareService.uploadFile(
        photo.buffer,
        photo.originalname,
      );

      photoUrl = fileInfo.cdnUrl;
    }

    const updateData = {
      ...data,
      ...(photoUrl && { photo: photoUrl }),
    };

    return await this.userRepository.update(userId, updateData);
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserDocument | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundError('Invalid email.');

    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch) throw new BadRequestError('Old password is incorrect.');

    const hashedPassword = await hash(newPassword, SALT_ROUNDS);

    return await this.userRepository.update(userId, {
      password: hashedPassword,
    });
  }

  public async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundError('Invalid email');

    const token = createPasswordResetToken(String(user._id));

    this.mailService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        name: user.name,
        resetLink: `http://localhost:5000/api/v1/users/reset-password?token=${token}`,
        appName: 'Car Wash',
      },
    });
  }

  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const payload = verifyPasswordResetToken(token);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) throw new NotFoundError('Invalid user.');

    const hashedPassword = await hash(newPassword, SALT_ROUNDS);

    await this.userRepository.update(String(user._id), {
      password: hashedPassword,
    });
  }
}

export default UserService;
