import { Module } from '@nestjs/common'
import { EXPORT_SERVICES, SERVICES } from './services'

@Module({
  providers: [...SERVICES],
  exports: [...EXPORT_SERVICES],
})
export class AuthorizationModule {}
