import { Module } from '@nestjs/common';
import { LogModule } from '@libs/log';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from '@libs/database';

@Module({
  imports: [
    DatabaseModule, 
    LogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
