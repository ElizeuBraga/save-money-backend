import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Expense } from '../../common/entities/Expense.entity'
import { ExpenseCreateDto } from '../dto/expense-create.dto'
import { ulid } from 'ulid'

@Injectable()
export class ExpenseCreateUsecase {
  roles = [RoleEnum.EXPENSE_CREATE]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: ExpenseCreateDto) {
    this.authorizationService.validate(this.roles)

    const expense = this.repository.create({
      price: body.price,
      expiration: body.expiration,
      product: { id: body.productId },
    })

    console.log(expense)

    const [err] = await to(this.repository.save(expense))

    if (err) {
      changeError(err)
    }
  }
}
