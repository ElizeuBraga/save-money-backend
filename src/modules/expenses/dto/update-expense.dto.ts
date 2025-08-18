import { IsString, MaxLength, MinLength } from 'class-validator'
import { CreateExpenseDto } from './create-expense.dto'

export class UpdateExpenseDto extends CreateExpenseDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string

  @MaxLength(255)
  @IsString()
  expenseId: string
}
