import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { ProductExpense } from '../../common/entities/ProductExpense.entity'
import { Expense } from '../../common/entities/Expense.entity'

@Injectable()
export class ProductExpensePaginateUsecase {
  roles = [RoleEnum.EXPENSE_PRODUCT_READ]

  constructor(
    @InjectRepository(ProductExpense)
    private readonly repository: Repository<ProductExpense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const data = await this.repository
      .createQueryBuilder('product')
      .leftJoin(Expense, 'expense', 'expense.productId = product.id')
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('COALESCE(SUM(expense.price), 0)', 'totalExpense')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .getRawMany()

    return data as ProductExpense[]
  }
}
