import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import UserService from '../../../application/services/UserService.js';
import UserRepository from '../../../application/repositories/UserRepository.js';
import checkAuthentication from '../middlewares/auth.middleware.js';

const userRouter = Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

userRouter.post('/register', (req, res, next) =>
  userController.create(req, res, next),
);

userRouter.post('/login', (req, res, next) =>
  userController.login(req, res, next),
);

userRouter.post('/logout', (req, res, next) =>
  userController.logout(req, res, next),
);

userRouter.get('/users', checkAuthentication, (req, res, next) =>
  userController.findAll(req, res, next),
);

userRouter.get('/users/update-profile', checkAuthentication, (req, res, next) =>
  userController.updateProfile(req, res, next),
);

userRouter.get(
  '/users/update-password',
  checkAuthentication,
  (req, res, next) => userController.updatePassword(req, res, next),
);

export default userRouter;
