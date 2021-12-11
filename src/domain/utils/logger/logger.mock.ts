import { LoggerInterface } from './logger.interface';

export class LoggerMock implements LoggerInterface {
  public errorContent: string[] = [];
  public logContent: string[] = [];

  public error(message: string, ...meta: any[]): void {
    this.errorContent.push(message);
  }

  public log(message: any, context?: string): void {
    this.logContent.push(message);
  }

  public reset(): void {
    this.errorContent = [];
    this.logContent = [];
  }

  public verbose(message: any, context?: string): void {
    this.logContent.push(message);
  }

  debug(message: string): void {}
  info(message: string): void {}
  warn(message: string): void {}
}
