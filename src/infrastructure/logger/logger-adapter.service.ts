import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from "winston";
import { WinstonConfig } from "./winston.config";
import { VError } from '@netflix/nerror';
import { LoggerVErrorInterface } from './logger-v-error.interface';

@Injectable()
export class LoggerAdapterService implements LoggerVErrorInterface {
  private readonly logger: Logger;

  constructor() {
    this.logger = winston.createLogger(
      WinstonConfig.getOptions(process.env.NODE_ENV || 'development'),
    );
  }

  public error(message: string, context?: string): void {
    this.logger.error(message, context);
  }

  public verror(error: VError): void {
    this.logger.error(LoggerAdapterService.formatFullStackErrorResolver(error));
  }

  public debug(message: any, context?: string): void {
    this.logger.debug(message, context);
  }

  public info(message: string, context?: string): void {
    this.logger.log('info', message, context);
  }

  public log(message: any, context?: string): void {
    this.logger.log('info', message, context);
  }

  public verbose(message: any, context?: string): void {
    this.logger.verbose(message, context);
  }

  public warn(message: any, context?: string): void {
    this.logger.warn(message, context);
  }

  public static formatFullStackErrorResolver(error: VError): string {
    return `${VError.fullStack(error)}\n\nInfos:\n${JSON.stringify(
      VError.info(error),
      null,
      2,
    )}\n\n`;
  }
}
