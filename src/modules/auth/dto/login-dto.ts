import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty()
  @MinLength(1)
  @IsString()
  username: string

  @ApiProperty()
  @MinLength(1)
  @IsString()
  password: string
}
