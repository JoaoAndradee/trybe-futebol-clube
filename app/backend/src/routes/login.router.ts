import { Router } from 'express';
import validateToken from '../middlewares/tokenValidation';
import LoginController from '../controllers/login.controller';

const router = Router();

router.post(
  '/',
  LoginController.login,
);

router.get(
  '/role',
  validateToken,
  LoginController.findRole,
);

export default router;
