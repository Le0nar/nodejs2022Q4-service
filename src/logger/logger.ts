import { LoggerService } from '@nestjs/common';
import { LogData } from './log-data.interface';
import { appendFile, mkdir } from 'fs/promises';

class Logger implements LoggerService {
  getContent({ url, queryParameters, stausCode, body }) {
    return `url: ${url} \n
query parameters: ${JSON.stringify(queryParameters)} \n
status code: ${stausCode} \n
body: ${JSON.stringify(body)} \n \n`;
  }

  async log(message: LogData) {
    try {
      await mkdir('logs');
    } catch (error) {}

    try {
      await appendFile('logs/logs.txt', this.getContent(message));
    } catch (error) {}
  }

  async error(message: LogData) {
    try {
      await mkdir('logs');
    } catch (error) {}

    try {
      await appendFile('logs/errors.txt', this.getContent(message));
    } catch (error) {}
  }

  async warn(message: LogData) {
    try {
      await mkdir('logs');
    } catch (error) {}

    try {
      await appendFile('logs/warnings.txt', this.getContent(message));
    } catch (error) {}
  }
}

export const logger = new Logger();
