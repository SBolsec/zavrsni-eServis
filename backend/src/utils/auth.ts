import { sign } from 'jsonwebtoken';
import { config } from '../config/constants';
import { User } from '../models';

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_EXPIRATION_TIME }
  );
}

export const createRefreshToken = (user: User) => {
  return sign(
      {
          userId: user.id,
          tokenVersion: user.tokenVersion
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: config.REFRESH_EXPIRATION_TIME }
  )
}