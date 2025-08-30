import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Expense } from '../../common/entities/Expense.entity'

@Injectable()
export class ExpenseMonthsUsecase {
  roles = [RoleEnum.EXPENSE_READ]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const expenses = await this.repository.find({
      select: {
        expiration: true,
      },
    })

    console.log(expenses)
  }
}
