import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string

  @ApiProperty()
  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  email: string

  @ApiProperty()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  password: string
}
