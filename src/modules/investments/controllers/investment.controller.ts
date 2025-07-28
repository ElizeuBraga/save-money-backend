import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
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
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateInvestmentDto,
  ) {
    return await this.createInvesmentUsecase.exec(body, user)
  }

  @Put(':id')
  async updatePrice(
    @Param('id') id: string,
    @Request() { user }: { user: User },
    @Body() body: UpdatePriceInvestmentDto,
  ) {
    return await this.updatePriceInvesmentUsecase.exec(id, body, user)
  }

  @Post(':id/contribution')
  async contribution(
    @Param('id') id: string,
    @Request() { user }: { user: User },
    @Body() body: ContributionInvestmentDto,
  ) {
    return await this.contributionInvesmentUsecase.exec(id, body, user)
  }

  @Get()
  async paginate(@Request() { user }: { user: User }) {
    return this.paginateInvestmentUsecase.exec(user)
  }
}
