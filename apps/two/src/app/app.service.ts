import { Inject, Injectable } from '@nestjs/common';
import { LogService } from '@libs/log';
import { Data, DataBooks, DataItem, DataService } from '@libs/data';
import { RequesterProvider } from './requester.provider';
import { ClientKafka } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AppService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly client: ClientKafka,
    private readonly logService: LogService,
    private readonly requester: RequesterProvider,
    private readonly dataService: DataService,
  ) {}

  addLog(message: string): void {
    this.logService.create(message);
  }

  async fetchLoop(query: string) {
    const maxResults = 40;
    let books = [];
    let startIndex = 0;

    try {
      while (true) {
        const response: DataBooks = await this.requester.get({
          q: query,
          maxResults,
          startIndex,
        });

        response.items?.map((item: DataItem) =>
          this.client.emit('api.add.book', plainToClass(Data, {
            id: item.id,
            title: item.volumeInfo?.title ?? '',
            authors: item.volumeInfo?.authors ?? [],
            publisher: item.volumeInfo?.publisher ?? ''
          }))
        );

        if (response.items && response.items.length > 0) {
          books = books.concat(response.items);
          startIndex += maxResults;
        } else {
          break; // Stop when no more results are available
        }
      }
    } catch (error) {
      console.log(error, 'er');
    }
  }

  async add(item: Data) {
    return this.dataService.create(item);
  }
}
