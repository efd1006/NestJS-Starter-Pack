import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/decorator/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {

  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @Get()
  async get() {
    return {
      message: 'protected route'
    }
  }
}
