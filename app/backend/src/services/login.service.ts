import { compareSync } from 'bcryptjs';
import { generateToken } from '../auth/authFunctions';
import ILogin from '../Interfaces/Login';
import validateLogin from './validations/validateLoginInput';
import UserModel from '../database/models/UserModel';

export default class LoginService {
  static async getLogin(login: ILogin) {
    const { email, password } = login;
    const error = validateLogin(login);
    if (error.type) return error;
    const userFields = await UserModel.findOne({
      where: { email },
    });
    if (!userFields) {
      return { type: 'invalidFields', message: 'Invalid email or password' };
    }

    const validPassword = compareSync(password, userFields.password);

    if (!validPassword) return { type: 'invalidFields', message: 'Invalid email or password' };
    const token = generateToken({ email });

    return { type: null, message: token };
  }
}
