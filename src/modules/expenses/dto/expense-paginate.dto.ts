import { IsNumber, Max, Min } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'

export class ExpensePaginateDto extends PaginatorDto {
  @Min(1)
  @Max(12)
  @IsNumber()
  month: number

  @IsNumber()
  year: number
}
