import { parse } from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Log, LogService } from '@libs/log';
import {Data, DataEntity, DataService, SearchQueryDto} from '@libs/data';
import { RequesterProvider } from './requester.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_SERVICE') private readonly client: ClientProxy,
    private readonly requester: RequesterProvider,
    private readonly dataService: DataService,
    private readonly logService: LogService
  ) {}

  async publishMessage(channel: string, message: string) {
    this.client.emit(channel, message);
    console.log(`Message published to ${channel}: ${message}`);
  }

  async init(name: string) {
    const response = await this.requester.get<DataEntity>({ q: name });

    this.client.emit('saving', response);
    console.log(`Message saving to`);
    return 'ok';
  }

  search(filter: Partial<Data>, pagination: SearchQueryDto): Promise<Data[]> {
    return this.dataService.findAll(filter, pagination);
  }

  filterLogs(startDate: string, endDate: string): Promise<Log[]> {
    const start = parse(startDate, "yyyy-MM-dd", new Date());
    const end = parse(endDate, "yyyy-MM-dd", new Date());

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    return this.logService.findByDate(start, end);
  }
}
