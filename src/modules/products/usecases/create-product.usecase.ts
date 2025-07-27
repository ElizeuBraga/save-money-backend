import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { User } from '../../common/entities/user.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Product } from '../../common/entities/Product.entity'

@Injectable()
export class CreateProductUsecase {
  roles = [RoleEnum.PRODUCT_CREATE]

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: CreateProductDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    const created = this.repository.create({
      name: body.name,
      category: { id: body.categoryId },
    })
    const [err] = await to(this.repository.save(created))

    if (err) {
      changeError(err)
    }
  }
}
