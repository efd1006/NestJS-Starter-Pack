import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

  @ApiBearerAuth()
  @Get()
  async get() {
    return await {
      message: 'user'
    }
  }
}
