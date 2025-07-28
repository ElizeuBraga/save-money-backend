import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { PaginateInvestmentUsecase } from '../usecases/paginate-investment.usecase'
import { CreateInvestmentDto } from '../dto/create-investment.dto'
import { CreateInvesmentUsecase } from '../usecases/create-invesment.usecase'
import { UpdatePriceInvesmentUsecase } from '../usecases/update-price-invesment.usecase'
import { UpdatePriceInvestmentDto } from '../dto/update-price-investment.dto'
import { ContributionInvestmentDto } from '../dto/contribution-investment.dto'
import { ContributionInvesmentUsecase } from '../usecases/contribution-invesment.usecase'

@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly paginateInvestmentUsecase: PaginateInvestmentUsecase,
    private readonly createInvesmentUsecase: CreateInvesmentUsecase,
    private readonly updatePriceInvesmentUsecase: UpdatePriceInvesmentUsecase,
    private readonly contributionInvesmentUsecase: ContributionInvesmentUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateInvestmentDto) {
    return await this.createInvesmentUsecase.exec(body)
  }

  @Put(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body() body: UpdatePriceInvestmentDto,
  ) {
    return await this.updatePriceInvesmentUsecase.exec(id, body)
  }

  @Post(':id/contribution')
  async contribution(
    @Param('id') id: string,
    @Body() body: ContributionInvestmentDto,
  ) {
    return await this.contributionInvesmentUsecase.exec(id, body)
  }

  @Get()
  async paginate() {
    return this.paginateInvestmentUsecase.exec()
  }
}
