import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JWTPayload): string => {
  const secret = env.jwtSecret;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  // Cast to any to bypass strict typing issues with jsonwebtoken
  return (jwt.sign as any)(payload, secret, {
    expiresIn: env.jwtExpiresIn || '7d',
  });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    const secret = env.jwtSecret;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
