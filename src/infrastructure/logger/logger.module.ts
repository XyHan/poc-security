import { Module } from '@nestjs/common';
import { LoggerAdapterService} from './logger-adapter.service';
import { LoggerHttpService } from './logger-http/logger-http.service';
import { LoggerStream } from './logger-http/logger.stream';
import { RequestIdMiddleware } from './logger-http/request-id/requestid.middleware';

@Module({
  providers: [
    LoggerAdapterService,
    LoggerStream,
    LoggerHttpService,
    RequestIdMiddleware,
  ],
  exports: [
    LoggerAdapterService,
    LoggerHttpService,
    RequestIdMiddleware,
  ]
})
export class LoggerModule {}
