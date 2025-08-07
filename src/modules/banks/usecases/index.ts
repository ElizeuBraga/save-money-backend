import { PaginateBankUsecase } from './get-all-bank.usecase'
import { CreateBankUsecase } from './create-bank.usecase'
import { UpdateBankUsecase } from './update-bank.usecase'

export const USE_CASES = [
  PaginateBankUsecase,
  CreateBankUsecase,
  UpdateBankUsecase,
]
