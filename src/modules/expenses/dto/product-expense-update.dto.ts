import { IsString, MaxLength, MinLength } from 'class-validator'
import { ProductExpenseCreateDto } from './product-expense-create.dto'

export class ProductExpenseUpdateDto extends ProductExpenseCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
