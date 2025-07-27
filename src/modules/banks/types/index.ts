import { ApiProperty } from '@nestjs/swagger'

export class CreateBankResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string
}
