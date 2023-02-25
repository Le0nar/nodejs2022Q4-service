import { LoggerService } from '@nestjs/common';
import { LogData } from './log-data.interface';
import { appendFile, mkdir } from 'fs/promises';

class Logger implements LoggerService {
  async log(message: LogData) {
    const content = `url: ${message.url} \n
query parameters: ${JSON.stringify(message.queryParameters)} \n
status code: ${message.stausCode} \n
body: ${JSON.stringify(message.body)} \n \n`;

    try {
      await mkdir('logs');
    } catch (error) {}

    try {
      await appendFile('logs/logs.txt', content);
    } catch (error) {}
  }
  async error(message: any, ...optionalParams: any[]) {
    // mkdir('logs');
    // appendFile('logs/errors.txt', content);
    // TODO: add logic for write file
    throw new Error('Method not implemented.');
  }

  async warn(message: any, ...optionalParams: any[]) {
    // TODO: add logic for write file
    throw new Error('Method not implemented.');
  }
}

export const logger = new Logger();
