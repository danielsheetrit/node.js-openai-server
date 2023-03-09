import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../error/ErrorHandler';

export const errorLogger = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(err);

  next(err);
};

export const errorAction = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // Dont delete this line!
) => {
  errorHandler.handleError(err, res);
};
