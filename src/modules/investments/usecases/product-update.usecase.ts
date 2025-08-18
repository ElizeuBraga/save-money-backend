import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Product } from '../../common/entities/Product.entity'
import { ProductUpdateDto } from '../dto/product-update.dto'

@Injectable()
export class ProductUpdateUsecase {
  roles = [RoleEnum.PRODUCT_UPDATE]

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: ProductUpdateDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(this.repository.save(body))

    if (err) {
      changeError(err)
    }
  }
}
