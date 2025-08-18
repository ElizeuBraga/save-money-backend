import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CategoryExpenseUpdateDto } from '../dto/category-expense-update.dto'
import { CategoryExpenseCreateDto } from '../dto/category-expense-create.dto'
import { CategoryExpenseCreateUsecase } from '../usecases/category-expense-create.usecase'
import { CategoryExpenseUpdateUsecase } from '../usecases/category-expense-update.usecase'
import { CategoryExpenseGetUsecase } from '../usecases/category-expense-get.usecase'

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly categoryExpenseCreateUsecase: CategoryExpenseCreateUsecase,
    private readonly categoryExpenseUpdateDto: CategoryExpenseUpdateUsecase,
    private readonly categoryExpenseGetUsecase: CategoryExpenseGetUsecase,
  ) {}

  @Put()
  async update(@Body() body: CategoryExpenseUpdateDto) {
    return await this.categoryExpenseUpdateDto.exec(body)
  }

  @Post()
  async create(@Body() body: CategoryExpenseCreateDto) {
    return await this.categoryExpenseCreateUsecase.exec(body)
  }

  @Get()
  async get() {
    return await this.categoryExpenseGetUsecase.exec()
  }
}
