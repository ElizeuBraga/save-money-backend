import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Expense } from '../../common/entities/Expense.entity'
import { ExpenseService } from '../services/expense.service'
import { ExpensePaidDto } from '../dto/expense-paid.dto'

@Injectable()
export class ExpensePaidUsecase {
  roles = [RoleEnum.EXPENSE_UPDATE]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Transactional()
  async exec(body: ExpensePaidDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(
      this.repository.save({ id: body.id, paid: !body.paid }),
    )

    if (err) {
      changeError(err)
    }
  }
}
