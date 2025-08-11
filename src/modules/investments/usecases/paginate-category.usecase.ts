import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { PaginateCategoryDto } from '../dto/paginate-category.dto'
import { Category } from '../../common/entities/Category.entity'
import sumBy from 'src/modules/common/utils/sum-by.util'
import percent from 'src/modules/common/utils/percent.util.'
import { Product } from 'src/modules/common/entities/Product.entity'

@Injectable()
export class PaginateCategoryUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: PaginateCategoryDto) {
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
      relations: body.onlyCategories
        ? []
        : ['products.papers.investments.paper.product.category'],
    })

    if (!body.onlyCategories) {
      const totalInvestments = sumBy(
        this.filterInvestments(categories),
        'price',
      )

      for (const category of categories) {
        const investments = this.filterInvestmentsByCategory(category)
        category.totalInvested = sumBy(investments, 'price')
        category.percentInvested = percent(
          category.totalInvested,
          totalInvestments,
        )

        for (const product of category.products) {
          const investments = this.filterInvestmentsByProduct(product)
          product.totalInvested = sumBy(investments, 'price')
        }
      }
    }

    return categories
  }

  private filterInvestmentsByCategory(category: Category) {
    const papers = category.products.flatMap((product) => product.papers)
    return papers.flatMap((paper) => paper.investments)
  }

  private filterInvestmentsByProduct(product: Product) {
    return product.papers.flatMap((paper) => paper.investments)
  }

  private filterInvestments(categories: Category[]) {
    const products = categories.flatMap((category) => category.products)
    const papers = products.flatMap((product) => product.papers)
    return papers.flatMap((paper) => paper.investments)
  }
}
