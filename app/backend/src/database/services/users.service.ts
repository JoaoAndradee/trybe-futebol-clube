import { compareSync } from 'bcryptjs';
import UserModel from '../models/UserModel';
import UserInterface from '../interfaces/UserInterface';
import validateUser from './validations/validateUserInputs';
import { generateToken } from '../auth/authFunctions';

class UserService {
  public static async getLogin(user: UserInterface) {
    const { email, password } = user;

    const error = validateUser(user);
    if (error.type) return error;

    const userField = await UserModel.findOne({
      where: { email },
    });

    if (!userField) {
      return { type: 'invalidFields', message: 'Invalid email or password' };
    }

    // const hashedPassword = hashSync(userField.password, 10);

    const validPassword = compareSync(password, userField.password);

    if (!validPassword) return { type: 'invalidFields', message: 'Invalid email or password' };

    const token = generateToken({ email });

    return { type: null, message: token };
  }
}

export default UserService;
