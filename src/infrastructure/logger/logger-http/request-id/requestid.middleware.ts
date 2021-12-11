import { Injectable } from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware {
  getMiddleWare() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.headers.id_request) {
        req.headers.id_request = uuidv4();
      }
      res.setHeader('id_request', req.headers.id_request);
      next();
    };
  }
}
