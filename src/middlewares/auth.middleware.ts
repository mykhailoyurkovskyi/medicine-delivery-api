import { IMiddleware } from '../interfaces/common/middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      verify(token, this.secret, (err, payload): void => {
        if (err) {
          next();
        } else if (payload) {
          const decoded = payload as { email: string } | undefined;
          if (decoded && decoded.email) {
            req.user = decoded.email;
            next();
          } else {
            next();
          }
        }
      });
    } else {
      next();
    }
  }
}