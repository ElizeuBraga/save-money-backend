import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { PaginateProductDto } from '../dto/paginate-product.dto'
import { User } from '../../common/entities/user.entity'
import { executaPaginacao } from '../../common/utils/exec-query-paginada.util'
import { Category } from '../../common/entities/Category.entity'

@Injectable()
export class PaginateProductUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: PaginateProductDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    const query = this.repository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name'])

    this.aplicarFiltros(query, body)

    return await executaPaginacao(query, body)
  }

  private aplicarFiltros(
    query: SelectQueryBuilder<Category>,
    body: PaginateProductDto,
  ) {
    if (body.nameContains) {
      query.where('category.name LIKE :name COLLATE NOCASE', {
        name: `%${body.nameContains.trim()}%`,
      })
    }
  }
}
