import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import 'reflect-metadata';
import { UserController } from "./controllers/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./services/logger.service";
import { ILogger } from "./interfaces/common/logger.interface";
import { TYPES } from "./types/types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { IUserController } from "./interfaces/users/users.controller.interface";
import { IConfigService } from "./interfaces/common/config.service.interface";
import { ConfigService } from "./services/config.service";
import { IUserService } from "./interfaces/users/user.service.interface";
import { UserService } from "./services/user.service";
import { UsersRepository } from "./repositories/user.repository";
import { IUsersRepository } from "./interfaces/users/users.repository.interface";
import { ISequelize } from "./interfaces/db/sequelize.interface";
import { SequelizeService } from "./services/sequelize.service";
import { IMedicineController } from "./interfaces/medicines/medicine.controller.interface";
import { MedicineController } from "./controllers/medicine.controller";

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUsersRepository>(TYPES.UsersRepository)
    .to(UsersRepository)
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IMedicineController>(TYPES.MedicineController).to(MedicineController);
  bind<ISequelize>(TYPES.SequelizeService)
  .to(SequelizeService)
  .inSingletonScope();
  bind<App>(TYPES.Application).to(App);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();