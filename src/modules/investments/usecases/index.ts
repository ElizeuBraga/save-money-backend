import { InvestmentPaginateUsecase } from './investment-paginate.usecase'
import { InvesmentCreateUsecase } from './invesment-create.usecase'
import { InvesmentUpdatePriceUsecase } from './invesment-update-price.usecase'
import { InvesmentContributionUsecase } from './invesment-contribution.usecase'
import { BankCreateUsecase } from './bank-create.usecase'
import { BankUpdateUsecase } from './bank-update.usecase'
import { PaginateBankUsecase } from './bank-paginate.usecase'
import { CategoryPaginateUsecase } from './category-paginate.usecase'
import { CategoryCreateUsecase } from './category-create.usecase'
import { CategoryUpdateUsecase } from './category-update.usecase'
import { PaperPaginateUsecase } from './paper-paginate.usecase'
import { PaperCreateUsecase } from './paper-create.usecase'
import { PaginateProductUsecase } from './paginate-product.usecase'
import { ProductCreateUsecase } from './product-create.usecase'
import { ProductUpdateUsecase } from './product-update.usecase'
import { BanksGetUsecase } from './banks-get.usecase'
import { PaperUpdateUsecase } from './paper-update.usecase'
import { PapersGetUsecase } from './papers-get.usecase'
import { CategoriesGetUsecase } from './categories-get.usecase'

export const USE_CASES = [
  InvestmentPaginateUsecase,
  InvesmentCreateUsecase,
  InvesmentUpdatePriceUsecase,
  InvesmentContributionUsecase,
  PaginateBankUsecase,
  BankCreateUsecase,
  BankUpdateUsecase,
  CategoryPaginateUsecase,
  CategoryCreateUsecase,
  CategoryUpdateUsecase,
  PaperPaginateUsecase,
  PaperCreateUsecase,
  PaginateProductUsecase,
  ProductCreateUsecase,
  ProductUpdateUsecase,
  BanksGetUsecase,
  PaperUpdateUsecase,
  PapersGetUsecase,
  CategoriesGetUsecase,
]
