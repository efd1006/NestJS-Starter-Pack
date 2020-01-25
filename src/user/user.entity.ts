import { Entity, Column, BeforeInsert } from "typeorm";
import { GenericEntity } from "src/shared/entity/generic.entity";
import * as bcrypt from 'bcryptjs'
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsOptional, MinLength, IsAlpha, IsEnum } from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";
const { CREATE, UPDATE } = CrudValidationGroups;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@Entity('user')
export class UserEntity extends GenericEntity {

  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsEmail({}, {message: 'Must be a valid email address', groups: [CREATE, UPDATE]})
  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  email: string

  @ApiProperty()
  @IsNotEmpty({groups: [CREATE]})
  @IsOptional({ groups: [UPDATE] })
  @MinLength(8, {groups: [CREATE, UPDATE]})
  @Column({
    type: 'varchar',
    length: 255
  })
  password: string

  @ApiProperty()
  @IsNotEmpty({groups: [CREATE]})
  @IsOptional({ groups: [UPDATE] })
  @IsAlpha("en-US",{groups: [CREATE, UPDATE]})
  @Column({
    type: 'varchar',
    length: 255
  })
  first_name: string

  @ApiProperty()
  @IsNotEmpty({groups: [CREATE]})
  @IsOptional({ groups: [UPDATE] })
  @IsAlpha("en-US",{groups: [CREATE, UPDATE]})
  @Column({
    type: 'varchar',
    length: 255
  })
  middle_name: string

  @ApiProperty()
  @IsNotEmpty({groups: [CREATE]})
  @IsOptional({ groups: [UPDATE] })
  @IsAlpha("en-US",{groups: [CREATE, UPDATE]})
  @Column({
    type: 'varchar',
    length: 255
  })
  last_name: string
  
  @ApiProperty({enum: UserRole})
  @IsNotEmpty({groups: [CREATE]})
  @IsOptional({ groups: [UPDATE] })
  @IsEnum(UserRole, {message: 'Invalid Role', groups: [CREATE, UPDATE]})
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}