import { Controller, Get, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateBankUsecase } from '../usecases/get-all-bank.usecase'
import { PaginatorDto } from '../../common/dto/paginator.dto'

@Controller('banks')
export class BankController {
  constructor(private readonly paginateBankUsecase: PaginateBankUsecase) {}

  @Get()
  getAll(@Query() body: PaginatorDto, @Request() { user }: { user: User }) {
    return this.paginateBankUsecase.exec(body, user)
  }
}
