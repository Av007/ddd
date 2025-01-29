import { Inject, Injectable } from '@nestjs/common';
import { Data } from './data.schema';
import { DatabaseService } from 'libs/database/src/lib/database.service';
import { SearchQueryDto } from '../types';

@Injectable()
export class DataRepository {
    constructor(@Inject() private databaseService: DatabaseService) {}

  create(createDataDto: Data) {
    const db = this.databaseService.getDb();
    db.collection('Datas').insertOne(createDataDto);
  }

  async findAll(filter: Partial<Data>, pagination: SearchQueryDto): Promise<Data[]> {
    const db = this.databaseService.getDb();
    return db.collection<Data>('Datas')
      .find(filter)
      .limit(pagination.limit)
      .skip(pagination.skip)
      .toArray();
  }
}
