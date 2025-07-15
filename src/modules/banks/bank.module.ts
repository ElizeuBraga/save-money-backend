import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { SERVICES } from './services'
import { Bank } from '../common/entities/bank.entity'
import { USE_CASES } from './usecases'

@Module({
  imports: [TypeOrmModule.forFeature([Bank]), AuthorizationModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...USE_CASES],
})
export class BankModule {}
