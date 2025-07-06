import { Router } from "express";
import UserController from "../controllers/UserController.js";
import UserService from "../../../application/services/UserService.js";
import UserRepository from "../../../application/repositories/UserRepository.js";
import checkAuthentication from "../middlewares/auth.middleware.js";

const userRouter = Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

userRouter.post('/register', (req, res) => userController.create(req, res));

userRouter.post('/login', (req, res) => userController.login(req, res));

userRouter.post('/logout', (req, res) => userController.logout(req, res));

userRouter.get('/users', checkAuthentication, (req, res) => userController.findAll(req, res));

userRouter.get('/users/update-profile', checkAuthentication, (req, res) => userController.updateProfile(req, res));

userRouter.get('/users/update-password', checkAuthentication, (req, res) => userController.updatePassword(req, res));

export default userRouter;