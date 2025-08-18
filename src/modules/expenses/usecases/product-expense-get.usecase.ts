import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { ProductExpense } from '../../common/entities/ProductExpense.entity'

@Injectable()
export class ProductExpenseGetUsecase {
  roles = [RoleEnum.PAPER_READ]

  constructor(
    @InjectRepository(ProductExpense)
    private readonly repository: Repository<ProductExpense>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    return await this.repository.find({
      select: {
        id: true,
        name: true,
      },
    })
  }
}
