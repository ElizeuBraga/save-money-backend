import { IsString, MaxLength, MinLength } from 'class-validator'
import { CategoryExpenseCreateDto } from './category-expense-create.dto'

export class CategoryExpenseUpdateDto extends CategoryExpenseCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
