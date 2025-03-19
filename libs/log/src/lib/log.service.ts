import { Inject, Injectable } from '@nestjs/common';
import { Log } from './log.entity';
import { DatabaseService } from '@libs/database';

@Injectable()
export class LogService {
  constructor(@Inject() private databaseService: DatabaseService) {
    
  }

  async findByDate(startDate: Date, endDate: Date): Promise<Log[]> {
    const db =  this.databaseService.getDb();
    return db.collection<Log>('Logs')
    .find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    .toArray()
  }

  async create(message: string) {
    const db =  this.databaseService.getDb();
    db.collection<Log>('Logs').insertOne({
      message,
      createdAt: new Date(),
    });
  }
}
