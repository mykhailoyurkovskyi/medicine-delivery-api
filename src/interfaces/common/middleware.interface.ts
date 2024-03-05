import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models/users/user.model';
import { IGetUserAuthInfoRequest } from '../../types/express';


export interface IMiddleware {
  execute: (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => void;
}