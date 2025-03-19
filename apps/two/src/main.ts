import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'local',
        brokers: ['kafka:9093'],
      },
      consumer: {
        groupId: 'test-id'
      },
    }
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  Logger.log(
    `🚀 Application is running on: localhost:9092`
  );
}

bootstrap();
