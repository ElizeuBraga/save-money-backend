import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class ExpenseCreateDto {
  @Min(1)
  @Max(99 * 1000 * 1000 + 0.99)
  @IsNumber()
  price: number

  @MinLength(1)
  @MaxLength(255)
  @IsString()
  productId: string

  @IsOptional()
  @MaxLength(255)
  @IsString()
  expenseId?: string

  @MinLength(1)
  @IsDateString()
  expiration: string
}
