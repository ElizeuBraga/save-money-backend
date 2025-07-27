import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreatePaperDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string

  @MinLength(1)
  @MaxLength(255)
  @IsString()
  productId: string
}
