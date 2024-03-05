import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./services/logger.service";
import { UserController } from "./controllers/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exceptionFilter: ExceptionFilter
    ) {
    this.app = express();
    this.port = 8000;
    this.logger = new LoggerService();
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }


  public async init(): Promise<void> {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}