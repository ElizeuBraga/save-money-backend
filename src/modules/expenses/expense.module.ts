import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { SERVICES } from './services'
import { USE_CASES } from './usecases'
import { Expense } from '../common/entities/Expense.entity'
import { ProductExpense } from '../common/entities/ProductExpense.entity'
import { CategoryExpense } from '../common/entities/CategoryExpense.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryExpense, Expense, ProductExpense]),
    AuthorizationModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...USE_CASES],
})
export class ExpenseModule {}
