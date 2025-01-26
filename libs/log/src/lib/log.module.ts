import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './log.service';
import { Log, LogSchema } from './log.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule {}
