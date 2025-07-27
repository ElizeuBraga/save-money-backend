import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { PaginatePaperDto } from '../dto/paginate-paper.dto'
import { User } from '../../common/entities/user.entity'
import { Category } from '../../common/entities/Category.entity'
import { Paper } from '../../common/entities/Paper.entity'

@Injectable()
export class PaginatePaperUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: PaginatePaperDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    return this.repository.find({
      select: { id: true, name: true },
      relations: ['products'],
    })
  }

  private aplicarFiltros(
    query: SelectQueryBuilder<Category>,
    body: PaginatePaperDto,
  ) {
    if (body.nameContains) {
      query.where('category.name LIKE :name COLLATE NOCASE', {
        name: `%${body.nameContains.trim()}%`,
      })
    }
  }
}
