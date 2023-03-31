import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

//Health Checkpoint Setup
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ schema: {
    type: 'object',
    properties: {
      status: { type: 'string' }
    }
  },
    status: 200,
  })
  @Get("/health")
  @HttpCode(200)
  health() {
    return this.appService.health();
  }
}
