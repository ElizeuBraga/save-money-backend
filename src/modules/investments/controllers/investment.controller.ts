import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { InvestmentPaginateUsecase } from '../usecases/investment-paginate.usecase'
import { InvestmentCreateDto } from '../dto/investment-create.dto'
import { InvesmentCreateUsecase } from '../usecases/invesment-create.usecase'
import { InvesmentUpdatePriceUsecase } from '../usecases/invesment-update-price.usecase'
import { InvestmentUpdatePriceDto } from '../dto/investment-update-price.dto'
import { InvestmentContributionDto } from '../dto/investment-contribution.dto'
import { InvesmentContributionUsecase } from '../usecases/invesment-contribution.usecase'

@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly paginateInvestmentUsecase: InvestmentPaginateUsecase,
    private readonly createInvesmentUsecase: InvesmentCreateUsecase,
    private readonly updatePriceInvesmentUsecase: InvesmentUpdatePriceUsecase,
    private readonly contributionInvesmentUsecase: InvesmentContributionUsecase,
  ) {}

  @Post()
  async create(@Body() body: InvestmentCreateDto) {
    return await this.createInvesmentUsecase.exec(body)
  }

  @Put(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body() body: InvestmentUpdatePriceDto,
  ) {
    return await this.updatePriceInvesmentUsecase.exec(id, body)
  }

  @Post(':id/contribution')
  async contribution(
    @Param('id') id: string,
    @Body() body: InvestmentContributionDto,
  ) {
    return await this.contributionInvesmentUsecase.exec(id, body)
  }

  @Get()
  async paginate() {
    return this.paginateInvestmentUsecase.exec()
  }
}
