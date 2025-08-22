import { IsString, MaxLength, MinLength } from 'class-validator'

export class ProductExpenseCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  categoryId: string

  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string
}
