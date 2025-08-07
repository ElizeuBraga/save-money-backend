import { IsString, MaxLength, MinLength } from 'class-validator'
import { CreateBankDto } from './create-bank.dto'

export class UpdateBankDto extends CreateBankDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string
}
