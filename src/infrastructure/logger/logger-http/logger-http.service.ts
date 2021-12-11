import { Inject, Injectable } from '@nestjs/common';
import * as morgan from 'morgan';
import { LoggerStream } from './logger.stream';

@Injectable()
export class LoggerHttpService {
  private readonly httpLogger: morgan;
  private format = ':remote-addr - :remote-user [:id_request][:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":message"';

  constructor(
    @Inject(LoggerStream) private readonly loggerStream: LoggerStream,
  ) {
    this.httpLogger = morgan;
    this.httpLogger.token('message', (req, res) => res.message);
    this.httpLogger.token('id_request', (req) => req.headers.id_request);
  }

  getMiddleWare(environment: string): morgan {
    this.loggerStream.setEnv(environment);
    return this.httpLogger(this.format, { stream: this.loggerStream });
  }
}
