import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from '@libs/log';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DataModule } from './data/data.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequesterProvider } from './requester.provider';
import { DatabaseModule } from '@libs/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: 'REDIS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT', 6379),
          },
        }),
      },
    ]),
    DataModule,
    LogModule
  ],
  controllers: [AppController],
  providers: [AppService, RequesterProvider],
})
export class AppModule {}
