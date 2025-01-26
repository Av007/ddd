import { Injectable } from '@nestjs/common';
import { LogService } from 'libs/log/src/lib/log.service';


@Injectable()
export class AppService {
  constructor(private readonly logService: LogService) {}

  addLog(message: string): void {
    this.logService.create(message);
  }
}
