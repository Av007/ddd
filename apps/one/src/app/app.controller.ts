import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';
import { Data, SearchQueryDto } from '@libs/data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/init/:name')
  async init(@Param('name') name: string) {
    this.appService.publishMessage('my-channel', 'init handler');

    return this.appService.init(name);
  }

  @Get('/search')
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of items to skip (pagination)',
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items to return (pagination)',
    type: Number,
    example: 10,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async search(@Query() query: Partial<Data> & SearchQueryDto) {
    console.log(query, 'query');

    // eslint-disable-next-line prefer-const
    let { skip, limit, ...queryParams } = query;

    skip = Number(skip) || 0;
    limit = Number(limit) || 10;

    await this.appService.publishMessage('my-channel', 'search handler');

    return this.appService.search(queryParams, { skip, limit });
  }

  @Get('/logs/:startDate/:endDate')
  async logs(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string
  ) {
    return this.appService.filterLogs(startDate, endDate);
  }
}
