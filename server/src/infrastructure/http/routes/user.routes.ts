import { Router } from 'express';

import UserController from '../controllers/UserController.js';
import UserService from '../../../application/user/implementation/UserService.js';
import UserRepository from '../../../application/user/implementation/UserRepository.js';
import checkAuthentication from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import {
  createUserSchema,
  loginUserSchema,
  updatePasswordSchema,
  updateUserSchema,
} from '../validations/user.schema.js';
import authorizedRoles from '../middlewares/authorized-roles.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const userRouter = Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

userRouter.post(
  '/users/register',
  upload.single('photo'),
  validate(createUserSchema),
  userController.create.bind(userController),
);

userRouter.post(
  '/users/login',
  validate(loginUserSchema),
  userController.login.bind(userController),
);

userRouter.post('/users/logout', userController.logout.bind(userController));

userRouter.get(
  '/users',
  checkAuthentication,
  authorizedRoles('admin', 'superadmin'),
  userController.findAll.bind(userController),
);

userRouter.patch(
  '/users/update-profile',
  checkAuthentication,
  upload.single('photo'),
  validate(updateUserSchema),
  userController.updateProfile.bind(userController),
);

userRouter.put(
  '/users/update-password',
  checkAuthentication,
  validate(updatePasswordSchema),
  userController.updatePassword.bind(userController),
);

userRouter.get(
  '/users/me',
  checkAuthentication,
  userController.getUserInfo.bind(userController),
);

export default userRouter;
