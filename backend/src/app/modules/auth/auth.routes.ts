import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.register
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.get('/me', auth(), AuthController.getProfile);

router.patch(
  '/profile',
  auth(),
  validateRequest(AuthValidation.updateProfileZodSchema),
  AuthController.updateProfile
);

router.patch(
  '/change-password',
  auth(),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
