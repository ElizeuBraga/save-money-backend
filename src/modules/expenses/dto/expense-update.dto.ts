import { IsString, MaxLength, MinLength } from 'class-validator'
import { ExpenseCreateDto } from './expense-create.dto'

export class ExpenseUpdateDto extends ExpenseCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
