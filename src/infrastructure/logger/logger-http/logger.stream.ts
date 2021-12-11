import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from 'winston';
import { WinstonConfig } from '../winston.config';

@Injectable()
export class LoggerStream {
  private environment: string;
  private readonly logger: Logger;
  constructor() {
    this.logger = winston.createLogger(WinstonConfig.getOptionsHttp(process.env.NODE_ENV || 'development'));
  }
  write(text: string): void {
    this.logger.info(text);
  }

  setEnv(environment: string) {
    this.environment = environment;
  }
}
