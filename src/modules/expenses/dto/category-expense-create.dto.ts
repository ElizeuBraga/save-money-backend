import { IsString, MaxLength, MinLength } from 'class-validator'

export class CategoryExpenseCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string
}
