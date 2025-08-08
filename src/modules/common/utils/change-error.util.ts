import { ConflictException } from '@nestjs/common'
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm'

type ChangeErrorOptions = {
  exists?: string
}

export function changeError(
  err: Error | null,
  { exists }: ChangeErrorOptions = {},
): void {
  if (err instanceof EntityPropertyNotFoundError) {
    throw err
  }

  if (err instanceof QueryFailedError) {
    if (err.driverError.message.includes('UNIQUE')) {
      throw new ConflictException(exists || 'Registro já existe')
    }

    if (err.driverError.message.includes('NOT NULL')) {
      throw new ConflictException(
        exists || 'Algum dado obrigatório não foi enviado',
      )
    }
    throw err
  }
}
