import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Product } from '../../common/entities/Product.entity'
import sumBy from '../../common/utils/sum-by.util'
import percent from '../../common/utils/percent.util.'

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
      relations: ['papers.investments'],
    })

    const totalInvestments = sumBy(this.filterInvestments(products), 'price')
    for (const product of products) {
      const investments = this.filterInvestmentsByProduct(product)
      product.totalInvested = sumBy(investments, 'price')
      product.percentInvested = percent(product.totalInvested, totalInvestments)

      for (const paper of product.papers) {
        paper.totalInvested = sumBy(paper.investments, 'price')
      }
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
