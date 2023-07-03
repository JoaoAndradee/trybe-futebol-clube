import IUser from '../../Interfaces/Login';
import loginSchema from './schemas/loginSchema';

const validateLogin = (user: IUser) => {
  const { error } = loginSchema.validate(user);
  if (error && error.details[0].type === 'string.email') {
    return { type: 'invalidFields', message: 'Invalid email or password' };
  }
  if (error && error.details[0].type === 'string.min') {
    return { type: 'invalidFields', message: 'Invalid email or password' };
  }
  if (error) {
    return { type: 'badRequest', message: 'All fields must be filled' };
  }

  return { type: null, message: '' };
};

export default validateLogin;
