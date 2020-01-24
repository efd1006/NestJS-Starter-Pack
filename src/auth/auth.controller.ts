import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/Login.dto';

@ApiTags('Auth Management')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO
  ) {
    return await this.authService.register(registerDTO)
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(
    @Body() loginDTO: LoginDTO
  ){
    return await this.authService.login(loginDTO)
  }

}
