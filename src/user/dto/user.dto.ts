import { UserRole } from "../user.entity"
import { Exclude } from "class-transformer"

export class UserDTO {
  email: string
  @Exclude()
  password: string
  first_name: string
  middle_name: string
  last_name: string
  role: UserRole

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}