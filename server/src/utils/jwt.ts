import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, env.jwtSecret as string, {
    expiresIn: env.jwtExpiresIn,
  });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, env.jwtSecret as string) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
