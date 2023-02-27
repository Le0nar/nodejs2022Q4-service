import { Injectable, NestMiddleware } from '@nestjs/common';
import { logger } from './logger';
import { Request, Response } from 'express';
import { LogData } from './log-data.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const logData: LogData = {
      url: req.originalUrl,
      queryParameters: req.query,
      body: req.body,
      stausCode: res.statusCode,
    };

    if (res.statusCode >= 400) {
      await logger.error(logData);
    } else {
      await logger.log(logData);
    }

    next();
  }
}
