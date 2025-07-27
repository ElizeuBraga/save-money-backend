import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { SERVICES } from './services'
import { USE_CASES } from './usecases'
import { Investment } from '../common/entities/Investment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), AuthorizationModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...USE_CASES],
})
export class InvestmentModule {}
