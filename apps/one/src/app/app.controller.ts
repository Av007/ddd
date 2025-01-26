import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PaginationType } from './types';
import { Data } from './data/data.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/init/:name')
  async init(@Param('name') name: string) {
    await this.appService.publishMessage('my-channel', 'init handler');

    return this.appService.init(name);
  }

  @Get('/search')
  async search(@Query() query: Partial<Data> & PaginationType) {
    const { skip, limit, ...queryParams } = query;

    await this.appService.publishMessage('my-channel', 'search handler');
    
    return this.appService.search(queryParams, { skip, limit });
  }

  @Get('/logs/:startDate/:endDate')
  async logs(@Param('startDate') startDate: string, @Param('endDate') endDate: string) {
    return this.appService.filterLogs(startDate, endDate);
  }
}
