import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataRepository } from './data.repository';
import { Data, DataSchema } from './data.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }])],
    providers: [DataRepository],
    exports: [DataRepository]
})
export class DataModule {}
