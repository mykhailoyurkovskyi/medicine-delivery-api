import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./services/logger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = new LoggerService();
  }

  public async init(): Promise<void> {
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}