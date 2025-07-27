import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateBankUsecase } from '../usecases/get-all-bank.usecase'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateBankDto } from '../dto/paginate-bank.dto'
import { ApiOkResponsePaged } from '../../common/decorators/api-ok-response-paged.metadata'
import { CreateBankDto } from '../dto/create-bank.dto'
import { CreateBankUsecase } from '../usecases/create-bank.usecase'

@Controller('banks')
export class BankController {
  constructor(
    private readonly paginateBankUsecase: PaginateBankUsecase,
    private readonly createBankUsecase: CreateBankUsecase,
  ) {}

  @Post()
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateBankDto,
  ) {
    return await this.createBankUsecase.exec(body, user)
  }

  @ApiOkResponsePaged(Bank)
  @Get()
  async paginate(
    @Query() input: PaginateBankDto,
    @Request() { user }: { user: User },
  ) {
    return this.paginateBankUsecase.exec(input, user)
  }
}
