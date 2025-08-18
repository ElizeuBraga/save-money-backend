import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'
import { Transform } from 'class-transformer'
import { booleanTransform } from '../../common/utils/boolean-transform.util'

export class ProductPaginateDto extends PaginatorDto {
  @IsString()
  @IsOptional()
  nameContains?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return booleanTransform(value)
  })
  onlyProducts?: boolean
}
