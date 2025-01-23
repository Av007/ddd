/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'redis',
      port: 6379,
      retryAttempts: 5
    },
  });

  await app.listen();
  Logger.log(
    `🚀 Application is running on: http://${process.env.REDIS_HOST}:6379/`
  );
}

bootstrap();
