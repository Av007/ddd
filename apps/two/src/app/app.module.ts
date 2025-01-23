import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { LogModule } from './log/log.module';

@Module({
  imports: [MongooseModule.forRoot(configuration().database.url), LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
