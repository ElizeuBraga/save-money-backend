import { Controller, Get, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateBankUsecase } from '../usecases/get-all-bank.usecase'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateBankDto } from '../dto/paginate-bank.dto'
import { ApiOkRespostaPaginada } from '../../common/decorators/api-ok-resposta-paginada.metadata'

@Controller('banks')
export class BankController {
  constructor(private readonly paginateBankUsecase: PaginateBankUsecase) {}

  @ApiOkRespostaPaginada(Bank)
  @Get()
  async paginar(
    @Query() input: PaginateBankDto,
    @Request() { user }: { user: User },
  ) {
    return this.paginateBankUsecase.exec(input, user)
  }
}
