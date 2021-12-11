import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LoggerOptions } from 'winston';

export class WinstonConfig {
  static getOptions(environment: string): LoggerOptions {
    let levelName = 'info';
    if (environment === 'production') {
      levelName = 'error';
    }
    const transport = new DailyRotateFile({
      dirname: 'var/logs',
      filename: environment + '.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level:  levelName,
    });

    return {
      level: levelName,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata({fillExcept: ['message', 'level', 'timestamp']}),
        winston.format.colorize(),
        winston.format.printf(info => {
          let out = `[${info.timestamp}] ${info.level}: ${info.message}`;
          if (info.metadata[0]) {
            out += ' - ' + info.metadata[0];
          }
          return out;
        }),
      ),
      transports: [
        transport,
        new winston.transports.Console(
          {format: winston.format.combine(winston.format.colorize(), winston.format.align())}
        ),
      ],
    };
  }

  static getOptionsHttp(environment: string): LoggerOptions {
    const options: LoggerOptions = WinstonConfig.getOptions(environment);
    const transportHttp = new DailyRotateFile({
      dirname: 'var/logs',
      filename: `access.${environment}.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level:  'info',
    });
    options.transports = [transportHttp];
    return options;
  }
}
