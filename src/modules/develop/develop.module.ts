import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
@Module({
  imports: [TypeOrmModule.forFeature([]), AuthorizationModule],
  controllers: [...CONTROLLERS],
  // providers: [...SERVICES, ...USE_CASES],
})
export class DevelopModule {}
