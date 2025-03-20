import { Module } from '@nestjs/common';
import { LogModule } from '@libs/log';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from '@libs/database';
import { DataService } from '@libs/data';

@Module({
  imports: [
    DatabaseModule, 
    LogModule
  ],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}
