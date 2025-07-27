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
    if (err.driverError.code === 'SQLITE_CONSTRAINT') {
      throw new ConflictException(exists || 'Registro já existe')
    }
    throw err
  }
}
