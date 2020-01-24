import { ApiProperty } from "@nestjs/swagger"

import { IsNotEmpty, IsEmail, MinLength } from "class-validator"

export class LoginDTO {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, {message: 'Must be a valid email address'})
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}