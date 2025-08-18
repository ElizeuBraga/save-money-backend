import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Category } from '../../common/entities/Category.entity'
import sumBy from 'src/modules/common/utils/sum-by.util'
import percent from 'src/modules/common/utils/percent.util.'

@Injectable()
export class CategoryPaginateUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const categories = await this.repository.find({
      select: {
        id: true,
        name: true,
        products: {
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
      },
      relations: ['products.papers.investments.paper.product.category'],
    })

    const totalInvestments = sumBy(this.filterInvestments(categories), 'price')

    for (const category of categories) {
      category.investments = this.filterInvestmentsByCategory(category)
      category.totalInvested = sumBy(category.investments, 'price')
      category.percentInvested = percent(
        category.totalInvested,
        totalInvestments,
      )
    }

    return categories
  }

  private filterInvestmentsByCategory(category: Category) {
    const papers = category.products.flatMap((product) => product.papers)
    return papers.flatMap((paper) => paper.investments)
  }

  private filterInvestments(categories: Category[]) {
    const products = categories.flatMap((category) => category.products)
    const papers = products.flatMap((product) => product.papers)
    return papers.flatMap((paper) => paper.investments)
  }
}
