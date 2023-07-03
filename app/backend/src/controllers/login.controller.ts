import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import { mapError } from '../utils/mapError';

export default class TeamController {
  static async login(req: Request, res: Response) {
    const loginInfo = req.body;

    const { type, message } = await LoginService.getLogin(loginInfo);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ token: message });
  }
}
