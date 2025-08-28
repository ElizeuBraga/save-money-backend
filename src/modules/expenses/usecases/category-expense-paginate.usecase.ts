import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Expense } from '../../common/entities/Expense.entity'
import { CategoryExpense } from '../../common/entities/CategoryExpense.entity'
import { ProductExpense } from '../../common/entities/ProductExpense.entity'

@Injectable()
export class CategoryExpensePaginateUsecase {
  roles = [RoleEnum.EXPENSE_CATEGORY_READ]

  constructor(
    @InjectRepository(CategoryExpense)
    private readonly repository: Repository<CategoryExpense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const data = await this.repository
      .createQueryBuilder('category')
      .leftJoin(ProductExpense, 'product', 'product.categoryId = category.id')
      .leftJoin(Expense, 'expense', 'expense.productId = product.id')
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('COALESCE(SUM(expense.price), 0)', 'totalExpense')
      .groupBy('category.id')
      .addGroupBy('category.name')
      .getRawMany()

    return data as CategoryExpense[]
  }
}
