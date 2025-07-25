import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { Paged } from '../types'

export const ApiOkRespostaPaginada = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(Paged, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              itens: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
          { $ref: getSchemaPath(Paged) },
        ],
      },
    }),
  )
