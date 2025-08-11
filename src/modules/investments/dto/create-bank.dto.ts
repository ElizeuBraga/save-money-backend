import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateBankDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  name: string
}
