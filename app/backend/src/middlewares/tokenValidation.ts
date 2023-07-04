import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
