import { IsString, MaxLength, MinLength } from 'class-validator'
import { CategoryCreateDto } from './category-create.dto'

export class CategoryUpdateDto extends CategoryCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
