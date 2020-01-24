import { Entity, Column, BeforeInsert } from "typeorm";
import { GenericEntity } from "src/shared/entity/generic.entity";
import * as bcrypt from 'bcryptjs'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@Entity('user')
export class UserEntity extends GenericEntity {

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  email: string

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string

  @Column({
    type: 'varchar',
    length: 255
  })
  first_name: string

  @Column({
    type: 'varchar',
    length: 255
  })
  middle_name: string

  @Column({
    type: 'varchar',
    length: 255
  })
  last_name: string

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