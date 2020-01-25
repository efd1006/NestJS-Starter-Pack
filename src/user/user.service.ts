import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
}
