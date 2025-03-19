import { Inject, Injectable } from '@nestjs/common';
import { Data } from './data.schema';
import { DatabaseService } from '@libs/database';
import { SearchQueryDto } from './data.types';

@Injectable()
export class DataService {
    constructor(@Inject() private databaseService: DatabaseService) {}

  async create(createDataDto: Data) {
    const db = this.databaseService.getDb();
    return db.collection('Datas').insertOne(createDataDto);
  }

  async findAll(filter: Partial<Data>, pagination: SearchQueryDto): Promise<Data[]> {
    const db = this.databaseService.getDb();
    return db.collection<Data>('Datas')
      .find(filter)
      .limit(pagination.limit || -1)
      .skip(pagination.skip || 0)
      .toArray();
  }
}
