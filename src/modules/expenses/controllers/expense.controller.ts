import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ExpenseCreateUsecase } from '../usecases/expense-create.usecase'
import { ExpenseUpdateUsecase } from '../usecases/expense-update.usecase'
import { ExpenseUpdateDto } from '../dto/expense-update.dto'
import { ExpenseCreateDto } from '../dto/expense-create.dto'
import { ExpensePaginateUsecase } from '../usecases/expense-paginate.usecase'
import { ExpensePaginateDto } from '../dto/expense-paginate.dto'

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly createExpenseUsecase: ExpenseCreateUsecase,
    private readonly updateExpenseUsecase: ExpenseUpdateUsecase,
    private readonly expensePaginateUsecase: ExpensePaginateUsecase,
  ) {}

  @Post()
  async create(@Body() body: ExpenseCreateDto) {
    return await this.createExpenseUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: ExpenseUpdateDto) {
    return await this.updateExpenseUsecase.exec(body)
  }

  @Get()
  async paginate(@Query() body: ExpensePaginateDto) {
    return await this.expensePaginateUsecase.exec(body)
  }
}
