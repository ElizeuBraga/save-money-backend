import { ExpenseCreateUsecase } from './expense-create.usecase'
import { ExpenseUpdateUsecase } from './expense-update.usecase'
import { ExpensePaginateUsecase } from './expense-paginate.usecase'
import { ProductExpenseGetUsecase } from './product-expense-get.usecase'
import { ProductExpenseUpdateUsecase } from './product-expense-update.usecase'
import { ProductExpenseCreateUsecase } from './product-expense-create.usecase'
import { CategoryExpenseUpdateUsecase } from './category-expense-update.usecase'
import { CategoryExpenseGetUsecase } from './category-expense-get.usecase'
import { CategoryExpenseCreateUsecase } from './category-expense-create.usecase'
import { ExpenseDeleteUsecase } from './expense-delete.usecase'
import { ExpensePaidUsecase } from './expense-paid.usecase'
import { ExpenseChildrenUsecase } from './expense-children.usecase'
import { ProductExpensePaginateUsecase } from './product-expense-paginate.usecase'
import { CategoryExpensePaginateUsecase } from './category-expense-paginate.usecase'
import { ExpenseMonthsUsecase } from './expense-months.usecase'

export const USE_CASES = [
  ExpenseCreateUsecase,
  ExpenseUpdateUsecase,
  ExpensePaginateUsecase,
  ProductExpenseGetUsecase,
  ProductExpenseUpdateUsecase,
  ProductExpenseCreateUsecase,
  CategoryExpenseUpdateUsecase,
  CategoryExpenseGetUsecase,
  CategoryExpenseCreateUsecase,
  ExpenseDeleteUsecase,
  ExpensePaidUsecase,
  ExpenseChildrenUsecase,
  ProductExpensePaginateUsecase,
  CategoryExpensePaginateUsecase,
  ExpenseMonthsUsecase,
]
