import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return { ok: true }
  }
}
