import { IsString, MaxLength, MinLength } from 'class-validator'

export class CategoryCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string
}
