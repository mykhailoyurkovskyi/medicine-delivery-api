import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/users/user.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { HTTPError } from '../errors/http-error';
import jwt from 'jsonwebtoken';
import { IMiddleware } from '../interfaces/common/middleware.interface';

@injectable()
export class AdminGuard implements IMiddleware {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserService) private userService: IUserService,
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    const secret = this.configService?.get('SECRET');

    if (token && secret) {
      const decoded = jwt.verify(token, secret);

      if (decoded && typeof decoded === 'object' && 'email' in decoded) {
        const userEmail = (decoded as { email: string }).email;
        const isAdmin = await this.userService.isUserAdmin(userEmail);

        if (isAdmin) {
          next();
        } else {
          next(
            new HTTPError(
              403,
              'Access denied. Only admins can access this resource.',
            ),
          );
        }
      } else {
        next(new HTTPError(401, 'Unauthorized. Invalid token format.'));
      }
    } else {
      next(new HTTPError(401, 'Unauthorized. Token not provided.'));
    }
  }
}