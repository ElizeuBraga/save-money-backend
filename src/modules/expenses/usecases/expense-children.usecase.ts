import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Expense } from '../../common/entities/Expense.entity'

@Injectable()
export class ExpenseChildrenUsecase {
  roles = [RoleEnum.EXPENSE_READ]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(id: string) {
    this.authorizationService.validate(this.roles)

    return await this.repository.find({
      select: {
        id: true,
        price: true,
        expiration: true,
        paid: true,
        product: {
          id: true,
          name: true,
        },
        expense: {
          id: true,
        },
      },
      relations: ['product', 'expense'],
      where: {
        expense: { id },
      },
    })
  }
}
