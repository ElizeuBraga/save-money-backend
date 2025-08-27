import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { booleanTransform } from '../../common/utils/boolean-transform.util'

export class ExpensePaidDto {
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  id: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return booleanTransform(value)
  })
  paid: boolean
}
