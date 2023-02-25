import { Injectable, NestMiddleware } from '@nestjs/common';
import { logger } from './logger';
import { Request, Response } from 'express';
import { LogData } from './log-data.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    // TODO: mb handle errors
    const logData: LogData = {
      url: req.originalUrl,
      queryParameters: req.query,
      body: req.body,
      stausCode: res.statusCode,
    };
    logger.log(logData);

    next();
  }
}
