import { IsNumber, Max, Min } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'
import { Transform } from 'class-transformer'

export class ExpensePaginateDto extends PaginatorDto {
  @Min(1)
  @Max(12)
  @IsNumber()
  @Transform(({ value }) => {
    return parseInt(value)
  })
  month: number

  @IsNumber()
  @Transform(({ value }) => {
    return parseInt(value)
  })
  year: number
}
