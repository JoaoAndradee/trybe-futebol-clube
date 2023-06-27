import UserInterface from '../../interfaces/UserInterface';
import userSchema from './schemas/userSchema';

const validateUser = (user: UserInterface) => {
  const { error } = userSchema.validate(user);
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

export default validateUser;
