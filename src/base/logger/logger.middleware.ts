import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, _res: Response, next: NextFunction) {
    CustomLogger.log('Request...', req.url);
    next();
  }
}
