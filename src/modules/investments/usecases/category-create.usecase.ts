import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { CategoryCreateDto } from '../dto/category-create.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Category } from '../../common/entities/Category.entity'

@Injectable()
export class CategoryCreateUsecase {
  roles = [RoleEnum.CATEGORY_CREATE]

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: CategoryCreateDto) {
    this.authorizationService.validate(this.roles)

    const created = this.repository.create(body)
    const [err] = await to(this.repository.save(created))

    if (err) {
      changeError(err)
    }
  }
}
