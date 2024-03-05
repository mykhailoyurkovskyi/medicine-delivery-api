import { IConfigService } from '../interfaces/common/config.service.interface';
import { DotenvConfigOutput, config } from 'dotenv';
import 'reflect-metadata';
import { ILogger } from '../interfaces/common/logger.interface';
import { TYPES } from '../types/types';
import { inject, injectable } from 'inversify';
import { ProcessEnv } from '../interfaces/common/process.env';

@injectable()
export class ConfigService implements IConfigService {
  private config: ProcessEnv;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result = config();
    if (result.error) {
      this.logger.error('error reading .env file', result.error);
      this.config = {};
    } else {
      this.logger.log('config from .env loaded');
      this.config = result.parsed as ProcessEnv;
    }
  }

  get(key: string): string {
    return this.config[key as string] as string;
  }
}