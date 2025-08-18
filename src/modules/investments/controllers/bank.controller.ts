import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { PaginateBankUsecase } from '../usecases/bank-paginate.usecase'
import { BankCreateUsecase } from '../usecases/bank-create.usecase'
import { BankUpdateUsecase } from '../usecases/bank-update.usecase'
import { BankUpdateDto } from '../dto/bank-update.dto'
import { BankCreateDto } from '../dto/bank-create.dto'
import { BanksGetUsecase } from '../usecases/banks-get.usecase'

@Controller('banks')
export class BankController {
  constructor(
    private readonly paginateBankUsecase: PaginateBankUsecase,
    private readonly getBanksUsecase: BanksGetUsecase,
    private readonly createBankUsecase: BankCreateUsecase,
    private readonly updateBankUsecase: BankUpdateUsecase,
  ) {}

  @Put()
  async update(@Body() body: BankUpdateDto) {
    return await this.updateBankUsecase.exec(body)
  }

  @Post()
  async create(@Body() body: BankCreateDto) {
    return await this.createBankUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateBankUsecase.exec()
  }

  @Get('/list')
  async getBanks() {
    return this.getBanksUsecase.exec()
  }
}
