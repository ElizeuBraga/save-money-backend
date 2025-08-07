import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { PaginateBankUsecase } from '../usecases/get-all-bank.usecase'
import { CreateBankDto } from '../dto/create-bank.dto'
import { CreateBankUsecase } from '../usecases/create-bank.usecase'
import { UpdateBankUsecase } from '../usecases/update-bank.usecase'
import { UpdateBankDto } from '../dto/update-bank.dto'

@Controller('banks')
export class BankController {
  constructor(
    private readonly paginateBankUsecase: PaginateBankUsecase,
    private readonly createBankUsecase: CreateBankUsecase,
    private readonly updateBankUsecase: UpdateBankUsecase,
  ) {}

  @Put()
  async update(@Body() body: UpdateBankDto) {
    return await this.updateBankUsecase.exec(body)
  }

  @Post()
  async create(@Body() body: CreateBankDto) {
    return await this.createBankUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateBankUsecase.exec()
  }
}
