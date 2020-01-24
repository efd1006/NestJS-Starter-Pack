import { UserRole } from "src/user/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsAlpha, MinLength, IsEnum } from "class-validator"

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, {message: 'Must be a valid email address'})
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  first_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  middle_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  last_name: string

  @ApiProperty({enum: UserRole})
  @IsEnum(UserRole, {message: 'Invalid Role'})
  @IsNotEmpty()
  @IsAlpha()
  role: UserRole
}