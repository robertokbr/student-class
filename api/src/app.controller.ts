import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller()
export class AppController {
  @Get()
  getHello() {
    return { ok: true };
  }
}
