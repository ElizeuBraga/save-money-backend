import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { SERVICES } from './services'
import { USE_CASES } from './usecases'
import { ExpenseCategory } from '../common/entities/ExpenseCategory.entity'
import { Expense } from '../common/entities/Expense.entity'
import { ExpenseProduct } from '../common/entities/ExpenseProduct.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseCategory, Expense, ExpenseProduct]),
    AuthorizationModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...USE_CASES],
})
export class ExpenseModule {}
