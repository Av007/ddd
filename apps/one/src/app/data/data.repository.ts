import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from '../schemas/data.schema';
import { PaginationType } from '../types';

@Injectable()
export class DataRepository {
    constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async create(createDataDto: Data): Promise<Data> {
    const createdData = new this.dataModel(createDataDto);
    return createdData.save();
  }

  async findAll(filter: Partial<Data>, pagination: PaginationType): Promise<Data[]> {
    // @see https://mongoosejs.com/docs/guide.html#methods
    return this.dataModel.find(filter).limit(pagination.limit).skip(pagination.skip).exec();
  }
}
