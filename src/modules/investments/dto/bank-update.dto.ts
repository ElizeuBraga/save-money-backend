import { IsString, MaxLength, MinLength } from 'class-validator'
import { BankCreateDto } from './bank-create.dto'

export class BankUpdateDto extends BankCreateDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
