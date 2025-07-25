import { ApiProperty } from '@nestjs/swagger'

export class IdResponse {
  @ApiProperty({
    description: 'ID do objeto salvo',
    type: 'string',
  })
  id: string | number
}

export class Paged<T> {
  @ApiProperty()
  items: T[]

  /**
   * Can return null case not in page 1
   */
  @ApiProperty({ type: Number })
  total?: number | null

  @ApiProperty()
  page: number

  @ApiProperty()
  perPage: number

  /**
   * Can return null if is not on page 1
   */
  @ApiProperty({ type: Number })
  pages?: number | null
}
