import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string

  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  email: string

  @MinLength(1)
  @MaxLength(255)
  @IsString()
  password: string
}
