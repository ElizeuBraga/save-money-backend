import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginatorDto } from '../../common/dto/paginator.dto'
import { Transform } from 'class-transformer'
import { booleanTransform } from '../../common/utils/boolean-transform.util'

export class PaginateCategoryDto extends PaginatorDto {
  @IsString()
  @IsOptional()
  nameContains?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return booleanTransform(value)
  })
  onlyCategories?: boolean
}
