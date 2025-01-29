import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { parse } from 'date-fns';
import { DataDomain } from './data/data.domain';
import { Data } from './data/data.schema';
import { RequesterProvider } from './requester.provider';
import { DataRepository } from './data/data.repository';
import { Log } from 'libs/log/src/lib/log.entity';
import { LogService } from 'libs/log/src/lib/log.service';
import { SearchQueryDto } from './types';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_SERVICE') private readonly client: ClientProxy,
    private readonly requester: RequesterProvider,
    private readonly dataRepository: DataRepository,
    private readonly logService: LogService
  ) {}

  async publishMessage(channel: string, message: string) {
    await this.client.emit(channel, message);
    console.log(`Message published to ${channel}: ${message}`);
  }

  async init(name: string) {
    const response: DataDomain = await this.requester.get({ q: name });

    const data = response.items.map((item) =>
      this.dataRepository.create({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
      })
    );

    Promise.all(data);

    return 'ok';
  }

  search(filter: Partial<Data>, pagination: SearchQueryDto): Promise<Data[]> {
    return this.dataRepository.findAll(filter, pagination);
  }

  filterLogs(startDate: string, endDate: string): Promise<Log[]> {
    const start = parse(startDate, "yyyy-MM-dd", new Date());
    const end = parse(endDate, "yyyy-MM-dd", new Date());

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    return this.logService.findByDate(start, end);
  }
}
