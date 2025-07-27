import { IsOptional, IsString } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'

export class PaginateProductDto extends PaginatorDto {
  @IsString()
  @IsOptional()
  nameContains?: string
}
