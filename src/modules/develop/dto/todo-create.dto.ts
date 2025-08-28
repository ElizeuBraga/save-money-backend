import { IsString, MaxLength, MinLength } from 'class-validator'

export class TodoCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  description: string
}
