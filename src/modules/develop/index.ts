import { TodoCreateUsecase } from './usecases/todo-create.usecase'
import { TodoPaginateUsecase } from './usecases/todo-paginate.usecase'
import { TodoDeleteUsecase } from './usecases/todo-delete.usecase'

export const USE_CASES = [
  TodoCreateUsecase,
  TodoDeleteUsecase,
  TodoPaginateUsecase,
]
