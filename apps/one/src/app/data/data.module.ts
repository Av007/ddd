import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from '../schemas/data.schema';
import { DataRepository } from './data.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }])],
    providers: [DataRepository],
    exports: [DataRepository]
})
export class DataModule {}
