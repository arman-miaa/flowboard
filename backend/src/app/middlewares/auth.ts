import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../errorHelpers/ApiError';
import httpStatus from 'http-status-codes';
import config from '../config';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser: JwtPayload;
      try {
        verifiedUser = jwt.verify(token, config.jwt.secret as string) as JwtPayload;
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
      }

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
