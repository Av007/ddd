import { DataEntity, DataItem, DataService } from '@libs/data';
import { LogService } from '@libs/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly logService: LogService,
    private readonly dataService: DataService
  ) {}

  addLog(message: string): void {
    this.logService.create(message);
  }

  async save(message: DataEntity): Promise<void> {
    console.info(`saving..`);
    const data = message.items.map((item: DataItem) =>
      this.dataService.create({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
      })
    );

    await Promise.all(data);
  }
}
