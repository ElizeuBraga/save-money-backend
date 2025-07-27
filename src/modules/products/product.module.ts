import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { SERVICES } from './services'
import { USE_CASES } from './usecases'
import { Category } from '../common/entities/Category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthorizationModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...USE_CASES],
})
export class ProductModule {}
