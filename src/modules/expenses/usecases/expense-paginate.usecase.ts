import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { IsNull, Repository } from 'typeorm'
import { Expense } from '../../common/entities/Expense.entity'
import { ExpensePaginateDto } from '../dto/expense-paginate.dto'

@Injectable()
export class ExpensePaginateUsecase {
  roles = [RoleEnum.EXPENSE_READ]

  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: ExpensePaginateDto) {
    this.authorizationService.validate(this.roles)

    return await this.repository.find({
      select: {
        id: true,
        price: true,
        expiration: true,
        product: {
          id: true,
          name: true,
        },
      },
      relations: ['product', 'expenses.product'],
      where: {
        expense: { id: IsNull() },
      },
    })
  }
}
