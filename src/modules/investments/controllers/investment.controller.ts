import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateInvestmentUsecase } from '../usecases/paginate-investment.usecase'
import { CreateInvestmentDto } from '../dto/create-investment.dto'
import { CreateInvesmentUsecase } from '../usecases/create-invesment.usecase'

@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly paginateInvestmentUsecase: PaginateInvestmentUsecase,
    private readonly createInvesmentUsecase: CreateInvesmentUsecase,
  ) {}

  @Post()
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateInvestmentDto,
  ) {
    return await this.createInvesmentUsecase.exec(body, user)
  }

  @Get()
  async paginate(@Request() { user }: { user: User }) {
    return this.paginateInvestmentUsecase.exec(user)
  }
}
