import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogRepository } from './log.repository';
import { Log, LogSchema } from '../schemas/log.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
    providers: [LogRepository],
    exports: [LogRepository]
})
export class LogModule {}
