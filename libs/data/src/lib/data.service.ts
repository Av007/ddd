import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '@libs/database';
import { Data } from './data.entity';
import { SearchQueryDto } from './data.types';

@Injectable()
export class DataService {
    constructor(@Inject() private databaseService: DatabaseService) {}

  create(createDataDto: Data) {
    const db = this.databaseService.getDb();
    db.collection('Datas').insertOne(createDataDto);
  }

  async findAll(filter: Partial<Data>, pagination: SearchQueryDto): Promise<Data[]> {
    const db = this.databaseService.getDb();
    return db.collection<Data>('Datas')
      .find(filter)
      .limit(pagination?.limit || 10)
      .skip(pagination?.skip || 0)
      .toArray();
  }
}
