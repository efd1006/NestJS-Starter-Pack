import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { Crud, CrudController, CrudAuth } from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AdminGuard } from 'src/shared/guard/admin.guard';

@Crud({
  model: {
    type: UserEntity
  },
  query: {
    exclude: ['password']
  },
  routes: {
    exclude: ['updateOneBase']
  }
})
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(new AuthGuard(), new AdminGuard())
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
