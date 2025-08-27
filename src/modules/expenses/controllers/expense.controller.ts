import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ExpenseCreateUsecase } from '../usecases/expense-create.usecase'
import { ExpenseUpdateUsecase } from '../usecases/expense-update.usecase'
import { ExpenseUpdateDto } from '../dto/expense-update.dto'
import { ExpenseCreateDto } from '../dto/expense-create.dto'
import { ExpensePaginateUsecase } from '../usecases/expense-paginate.usecase'
import { ExpensePaginateDto } from '../dto/expense-paginate.dto'
import { ExpenseDeleteDto } from '../dto/expense-delete.dto'
import { ExpenseDeleteUsecase } from '../usecases/expense-delete.usecase'
import { ExpensePaidDto } from '../dto/expense-paid.dto'
import { ExpensePaidUsecase } from '../usecases/expense-paid.usecase'
import { ExpenseChildrenUsecase } from '../usecases/expense-children.usecase'

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly createExpenseUsecase: ExpenseCreateUsecase,
    private readonly updateExpenseUsecase: ExpenseUpdateUsecase,
    private readonly expensePaginateUsecase: ExpensePaginateUsecase,
    private readonly expenseDeleteUsecase: ExpenseDeleteUsecase,
    private readonly expensePaidUsecase: ExpensePaidUsecase,
    private readonly expenseChildrenUsecase: ExpenseChildrenUsecase,
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

  @Delete()
  async remove(@Body() body: ExpenseDeleteDto) {
    return await this.expenseDeleteUsecase.exec(body)
  }

  @Put('/paid')
  async paid(@Body() body: ExpensePaidDto) {
    return await this.expensePaidUsecase.exec(body)
  }

  @Get(':id/children')
  async children(@Param('id') id: string) {
    return await this.expenseChildrenUsecase.exec(id)
  }
}
