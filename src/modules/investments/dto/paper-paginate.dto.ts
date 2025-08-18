import { IsOptional, IsString } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'

export class PaperPaginateDto extends PaginatorDto {
  @IsString()
  @IsOptional()
  nameContains?: string
}
