import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { Data } from '@libs/data';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('EVENT_SERVICE') private readonly client: ClientKafka,
  ) {}

  @EventPattern('api.init.book')
  initMessage(message: string) {
    this.appService.fetchLoop(message);
    console.info(`${message} was added`);
  }

  @EventPattern('api.add.book')
  async addMessage(@Payload() message: Data) {
    await this.appService.add(message);
    console.info(`test added`);
  }

  onModuleInit() {
    this.client.subscribeToResponseOf('api.add.book');
  }
}
