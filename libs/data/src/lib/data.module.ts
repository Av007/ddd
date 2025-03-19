import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { DataService } from './data.service';

@Module({
  imports: [DatabaseModule],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
