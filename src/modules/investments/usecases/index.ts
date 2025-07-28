import { PaginateInvestmentUsecase } from './paginate-investment.usecase'
import { CreateInvesmentUsecase } from './create-invesment.usecase'
import { UpdatePriceInvesmentUsecase } from './update-price-invesment.usecase'
import { ContributionInvesmentUsecase } from './contribution-invesment.usecase'

export const USE_CASES = [
  PaginateInvestmentUsecase,
  CreateInvesmentUsecase,
  UpdatePriceInvesmentUsecase,
  ContributionInvesmentUsecase,
]
