import { Body, Controller, Get, Post } from '@nestjs/common'
import { PaginateBankUsecase } from '../usecases/get-all-bank.usecase'
import { CreateBankDto } from '../dto/create-bank.dto'
import { CreateBankUsecase } from '../usecases/create-bank.usecase'

@Controller('banks')
export class BankController {
  constructor(
    private readonly paginateBankUsecase: PaginateBankUsecase,
    private readonly createBankUsecase: CreateBankUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateBankDto) {
    return await this.createBankUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateBankUsecase.exec()
  }
}
