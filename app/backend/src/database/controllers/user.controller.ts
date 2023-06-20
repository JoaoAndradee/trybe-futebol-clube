import { Request, Response } from 'express';
import UserService from '../services/users.service';
import { mapError } from '../utils/mapError';

class UserController {
  public static async login(req: Request, res: Response) {
    const userInfo = req.body;

    const { type, message } = await UserService.getLogin(userInfo);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ token: message });
  }
}

export default UserController;
