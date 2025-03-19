import { Module } from '@nestjs/common';
import { LogModule } from '@libs/log';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from '@libs/database';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RequesterProvider } from './requester.provider';
import { DataService } from '@libs/data';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'local',
            brokers: ['kafka:9093'],
          },
          consumer: {
            groupId: 'test-id',
          },
        },
      },
    ]),
    DatabaseModule, 
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequesterProvider, DataService],
})
export class AppModule {}
