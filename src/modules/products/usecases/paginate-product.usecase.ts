import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Product } from '../../common/entities/Product.entity'

@Injectable()
export class PaginateProductUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    return this.repository.find({
      select: {
        id: true,
        name: true,
      },
      relations: ['papers'],
    })
  }
}
