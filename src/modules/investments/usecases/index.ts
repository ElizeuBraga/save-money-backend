import { PaginateInvestmentUsecase } from './paginate-investment.usecase'
import { CreateInvesmentUsecase } from './create-invesment.usecase'
import { UpdatePriceInvesmentUsecase } from './update-price-invesment.usecase'
import { ContributionInvesmentUsecase } from './contribution-invesment.usecase'
import { CreateBankUsecase } from './create-bank.usecase'
import { UpdateBankUsecase } from './update-bank.usecase'
import { PaginateBankUsecase } from './get-all-bank.usecase'
import { PaginateCategoryUsecase } from './paginate-category.usecase'
import { CreateCategoryUsecase } from './create-category.usecase'
import { UpdateCategoryUsecase } from './update-category.usecase'
import { PaginatePaperUsecase } from './paginate-paper.usecase'
import { CreatePaperUsecase } from './create-paper.usecase'
import { PaginateProductUsecase } from './paginate-product.usecase'
import { CreateProductUsecase } from './create-product.usecase'
import { UpdateProductUsecase } from './update-product.usecase'
import { GetBanksUsecase } from './get-banks.usecase'
import { UpdatePaperUsecase } from './update-paper.usecase'
import { GetPapersUsecase } from './get-papers.usecase'
import { GetCategoriesUsecase } from './get-categories.usecase'

export const USE_CASES = [
  PaginateInvestmentUsecase,
  CreateInvesmentUsecase,
  UpdatePriceInvesmentUsecase,
  ContributionInvesmentUsecase,
  PaginateBankUsecase,
  CreateBankUsecase,
  UpdateBankUsecase,
  PaginateCategoryUsecase,
  CreateCategoryUsecase,
  UpdateCategoryUsecase,
  PaginatePaperUsecase,
  CreatePaperUsecase,
  PaginateProductUsecase,
  CreateProductUsecase,
  UpdateProductUsecase,
  GetBanksUsecase,
  UpdatePaperUsecase,
  GetPapersUsecase,
  GetCategoriesUsecase,
]
