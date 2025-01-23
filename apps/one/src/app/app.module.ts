import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { RequesterProvider } from './requester.provider';
import configuration from './config/configuration';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: configuration().redis.host,
          port: 6379,
        }
      },
    ]),
    MongooseModule.forRoot(configuration().database.url),
    DataModule,
    LogModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RequesterProvider],
})
export class AppModule {}
