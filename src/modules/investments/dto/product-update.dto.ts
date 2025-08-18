import { IsString, MaxLength, MinLength } from 'class-validator'
import { ProductCreateDto } from './product-create.dto'

export class ProductUpdateDto extends ProductCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
