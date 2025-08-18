import { IsNumber, Max, Min } from 'class-validator'

export class ExpenseCreateDto {
  @Min(1)
  @Max(99 * 1000 * 1000 + 0.99)
  @IsNumber()
  price: number
}
