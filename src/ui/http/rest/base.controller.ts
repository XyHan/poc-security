import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface PaginatedResponse<T> {
  page: number;
  pages: number;
  total: number;
  collection: T[];
}

export abstract class BaseController {
  protected readonly _logger: LoggerInterface;

  protected constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  protected paginateResponse<T>(size: number, page: number, collection: T[], total: number): PaginatedResponse<T> {
    const pages: number = Math.ceil(total / size) || 1;
    page === 0 ? page++ : page;

    return { page, pages, total, collection };
  }

  protected http404Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }

  protected http400Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  protected http401Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }
}
