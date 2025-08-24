import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class ExpenseDeleteDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string

  @IsOptional()
  @MaxLength(255)
  @IsString()
  expenseId?: string
}
