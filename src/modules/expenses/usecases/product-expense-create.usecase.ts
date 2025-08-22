import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { ProductExpense } from '../../common/entities/ProductExpense.entity'
import { ProductExpenseCreateDto } from '../dto/product-expense-create.dto'

@Injectable()
export class ProductExpenseCreateUsecase {
  roles = [RoleEnum.EXPENSE_PRODUCT_CREATE]

  constructor(
    @InjectRepository(ProductExpense)
    private readonly repository: Repository<ProductExpense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: ProductExpenseCreateDto) {
    this.authorizationService.validate(this.roles)

    const product = this.repository.create({
      name: body.name,
      category: { id: body.categoryId },
    })

    const [err] = await to(this.repository.save(product))

    if (err) {
      changeError(err)
    }
  }
}
