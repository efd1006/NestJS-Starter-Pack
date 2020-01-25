import { UserService } from "./user.service";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guard/auth.guard";
import { Crud, CrudAuth } from "@nestjsx/crud";
import { UserEntity } from "./user.entity";

@Crud({
  model: {
    type: UserEntity
  },
  query: {
    exclude: ['password']
  },
  params: {
    id: {
      primary: true,
      disabled: true
    }
  },
  routes: {
    exclude: ['getManyBase', 'deleteOneBase', 'createManyBase', 'createOneBase', 'updateOneBase']
  }
})
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => ({
    id: user.id,
  }),
})
@ApiTags('me')
@ApiBearerAuth()
@Controller('me')
@UseGuards(new AuthGuard())
export class MeController {
  constructor(public service: UserService) {}
}