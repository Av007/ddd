import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {DataEntity} from '@libs/data';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('my-channel')
  handleMessage(message: string) {
    this.appService.addLog(message);
    console.info(`${message} was added`);
  }

  @MessagePattern('saving')
  async createMessage(message: DataEntity) {
    this.appService.save(message);
  }
}
