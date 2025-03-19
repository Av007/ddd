import { parse } from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Data, DataBooks, DataService, SearchQueryDto } from '@libs/data';
import { Log, LogService } from '@libs/log';

@Injectable()
export class AppService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly client: ClientKafka,
    private readonly dataService: DataService,
    private readonly logService: LogService
  ) {}

  async init(name: string) {
    this.client.emit('api.init.book', name);

    return 'ok';
  }

  async search(filter: Partial<DataBooks>, pagination: SearchQueryDto): Promise<Data[]> {
    this.client.emit('api.search.book', 'sa');
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
