import { IsString, MaxLength, MinLength } from 'class-validator'
import { CreateCategoryDto } from './create-category.dto'

export class UpdateCategoryDto extends CreateCategoryDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
