import { ILogger } from "../interfaces/common/logger.interface";
import { BaseController } from "./base.controller";
import { HTTPError } from "../errors/http-error";
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

export class UserController extends BaseController {
  constructor(logger: ILogger) {
    super(logger);

    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login }
    ])
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    next(new HTTPError(401, 'authorization error', 'login'));
  }
}