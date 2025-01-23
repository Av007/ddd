import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from '../schemas/log.schema';

@Injectable()
export class LogRepository {
    constructor(@InjectModel(Log.name) private dataModel: Model<Log>) {}

  async create(message: string): Promise<Log> {
    const createdData = new this.dataModel({message});
    return createdData.save();
  }
}
