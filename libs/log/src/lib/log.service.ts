import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private dataModel: Model<Log>) {}

  async findByDate(startDate: Date, endDate: Date): Promise<Log[]> {
    // @see https://mongoosejs.com/docs/guide.html#methods
    console.log(startDate, endDate);
    
    return this.dataModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .exec();
  }

  async create(message: string): Promise<Log> {
    const createdData = new this.dataModel({message});
    return createdData.save();
  }
}
