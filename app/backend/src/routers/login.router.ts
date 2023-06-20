import { Router } from 'express';
import UserController from '../database/controllers/user.controller';

const router = Router();

router.post(
  '/',
  UserController.login,
);

export default router;
