import { Body, Controller, Post, Put } from '@nestjs/common'
import { CreateExpenseUsecase } from '../usecases/create-expense.usecase'
import { UpdateExpenseUsecase } from '../usecases/update-expense.usecase'
import { UpdateExpenseDto } from '../dto/update-expense.dto'
import { CreateExpenseDto } from '../dto/create-expense.dto'

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly createExpenseUsecase: CreateExpenseUsecase,
    private readonly updateExpenseUsecase: UpdateExpenseUsecase,
  ) {}

  @Put()
  async update(@Body() body: UpdateExpenseDto) {
    return await this.updateExpenseUsecase.exec(body)
  }

  @Post()
  async create(@Body() body: CreateExpenseDto) {
    return await this.createExpenseUsecase.exec(body)
  }
}
