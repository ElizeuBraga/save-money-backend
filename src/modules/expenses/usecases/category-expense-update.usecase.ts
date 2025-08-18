import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { CategoryExpense } from '../../common/entities/CategoryExpense.entity'
import { CategoryExpenseUpdateDto } from '../dto/category-expense-update.dto'

@Injectable()
export class CategoryExpenseUpdateUsecase {
  roles = [RoleEnum.EXPENSE_UPDATE]

  constructor(
    @InjectRepository(CategoryExpense)
    private readonly repository: Repository<CategoryExpense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: CategoryExpenseUpdateDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(this.repository.save(body))

    if (err) {
      changeError(err)
    }
  }
}
