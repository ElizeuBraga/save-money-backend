import { Transform } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class PaginatorDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => {
    return parseInt(value, 10) || 1
  })
  page?: number

  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Transform(({ value }) => {
    return parseInt(value, 10) || 15
  })
  perPage?: number
}
