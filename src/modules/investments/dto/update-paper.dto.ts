import { IsString, MaxLength, MinLength } from 'class-validator'
import { CreateProductDto } from './create-product.dto'

export class UpdatePaperDto extends CreateProductDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
