import { Entity, Column } from "typeorm";
import { GenericEntity } from "src/shared/entity/generic.entity";

@Entity('user')
export class UserEntity extends GenericEntity {

  @Column({
    type: 'varchar',
    length: 255
  })
  email: string

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string

}