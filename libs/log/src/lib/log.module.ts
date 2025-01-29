import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { DatabaseModule } from '@libs/database';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule {}
