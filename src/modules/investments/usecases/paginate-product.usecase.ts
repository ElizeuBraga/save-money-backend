import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Product } from '../../common/entities/Product.entity'
import sumBy from '../../common/utils/sum-by.util'
import percent from '../../common/utils/percent.util.'
import { ProductPaginateDto } from '../dto/product-paginate.dto'

@Injectable()
export class PaginateProductUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: ProductPaginateDto) {
    this.authorizationService.validate(this.roles)

    const products = await this.repository.find({
      select: {
        id: true,
        name: true,
        papers: {
          id: true,
          name: true,
          investments: {
            id: true,
            price: true,
          },
        },
      },
      relations: ['papers.investments.paper'],
    })

    const totalInvestments = sumBy(this.filterInvestments(products), 'price')
    for (const product of products) {
      product.investments = this.filterInvestmentsByProduct(product)
      product.totalInvested = sumBy(product.investments, 'price')
      product.percentInvested = percent(product.totalInvested, totalInvestments)
    }

    return products
  }

  private filterInvestmentsByProduct(product: Product) {
    return product.papers.flatMap((paper) => paper.investments)
  }

  private filterInvestments(products: Product[]) {
    const papers = products.flatMap((product) => product.papers)
    return papers.flatMap((paper) => paper.investments)
  }
}
