import express, { Express } from "express";
import { Server } from "http";
import 'reflect-metadata';
import { UserController } from "./controllers/users.controller";
import cors from "cors";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./interfaces/common/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types/types";
import { IConfigService } from "./interfaces/common/config.service.interface";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { ISequelize } from "./interfaces/db/sequelize.interface";
import { IUserService } from "./interfaces/users/user.service.interface";
import { IMedicineController } from "./interfaces/medicines/medicine.controller.interface";
import { MedicineController } from "./controllers/medicine.controller";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number | string | undefined;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.SequelizeService) private sequelizeService: ISequelize,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.MedicineController) private medicineController: MedicineController,
  ) {
    this.app = express();
    this.port = this.configService.get('PORT') || process.env.PORT;
    const authMiddleware = new AuthMiddleware(
      this.configService.get('SECRET') || process.env.SECRET || '',
    );
    this.app.use(authMiddleware.execute.bind(authMiddleware));
    this.configureMiddleware();
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: this.configService.get('CLIENT_URL') || process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  configureMiddleware(): void {
    this.app.use(express.json());
    this.useCors();
    this.useRoutes();
    this.useExceptionFilters();
    this.useStaticImg();
  }

  useStaticImg(): void {
    this.app.use(express.static('public'));
    this.app.use(express.static(__dirname + '/public'));
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
    this.app.use('/medicines', this.medicineController.router);
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