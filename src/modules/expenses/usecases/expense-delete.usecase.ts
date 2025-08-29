import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Expense } from '../../common/entities/Expense.entity'
import { ExpenseDeleteDto } from '../dto/expense-delete.dto'
import { ExpenseService } from '../services/expense.service'

@Injectable()
export class ExpenseDeleteUsecase {
  roles = [RoleEnum.EXPENSE_DELETE]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Transactional()
  async exec(body: ExpenseDeleteDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(this.repository.softDelete({ id: body.id }))

    if (err) {
      changeError(err)
    }

    if (body.expensesIds?.length) {
      for (const id of body.expensesIds) {
        const [err] = await to(this.repository.softDelete({ id }))

        if (err) {
          changeError(err)
        }
      }
    }
  }
}
