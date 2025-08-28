import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { ProductExpenseCreateDto } from '../dto/product-expense-create.dto'
import { ProductExpenseUpdateDto } from '../dto/product-expense-update.dto'
import { ProductExpenseCreateUsecase } from '../usecases/product-expense-create.usecase'
import { ProductExpenseUpdateUsecase } from '../usecases/product-expense-update.usecase'
import { ProductExpenseGetUsecase } from '../usecases/product-expense-get.usecase'
import { ProductExpensePaginateUsecase } from '../usecases/product-expense-paginate.usecase'

@Controller('expenses/products')
export class ExpenseProductController {
  constructor(
    private readonly productExpenseCreateUsecase: ProductExpenseCreateUsecase,
    private readonly productExpenseUpdateUsecase: ProductExpenseUpdateUsecase,
    private readonly productExpenseGetUsecase: ProductExpenseGetUsecase,
    private readonly expensePaginateUsecase: ProductExpensePaginateUsecase,
  ) {}

  @Post()
  async create(@Body() body: ProductExpenseCreateDto) {
    return await this.productExpenseCreateUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: ProductExpenseUpdateDto) {
    return await this.productExpenseUpdateUsecase.exec(body)
  }

  @Get()
  async get() {
    return await this.productExpenseGetUsecase.exec()
  }

  @Get('paginate')
  async paginate() {
    return await this.expensePaginateUsecase.exec()
  }
}
