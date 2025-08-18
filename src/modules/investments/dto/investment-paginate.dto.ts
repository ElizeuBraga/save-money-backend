import { IsOptional, IsString } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'

export class InvestmentPaginateDto extends PaginatorDto {
  @IsString()
  @IsOptional()
  nameContains?: string
}
