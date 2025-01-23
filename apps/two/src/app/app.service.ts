import { Injectable } from '@nestjs/common';
import { LogRepository } from './log/log.repository';

@Injectable()
export class AppService {
  constructor(private readonly logRepository: LogRepository) {}

  addLog(message: string): void {
    this.logRepository.create(message);
  }
}
