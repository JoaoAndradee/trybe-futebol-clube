import * as jwt from 'jsonwebtoken';
import TokenPayload from '../Interfaces/TokenPayload';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '300min',
};

const generateToken = (payload: TokenPayload) => jwt.sign(payload, secret, JWT_CONFIG);

const verifyToken = (token: string) => jwt.verify(token, secret);

export { generateToken, verifyToken };
