import { ExpenseCreateUsecase } from './expense-create.usecase'
import { ExpenseUpdateUsecase } from './expense-update.usecase'
import { ExpensePaginateUsecase } from './expense-paginate.usecase'

export const USE_CASES = [
  ExpenseCreateUsecase,
  ExpenseUpdateUsecase,
  ExpensePaginateUsecase,
]
