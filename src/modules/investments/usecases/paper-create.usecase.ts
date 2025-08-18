import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { PaperCreateDto } from '../dto/paper-create.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Paper } from '../../common/entities/Paper.entity'

@Injectable()
export class PaperCreateUsecase {
  roles = [RoleEnum.CATEGORY_CREATE]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: PaperCreateDto) {
    this.authorizationService.validate(this.roles)

    const created = this.repository.create({
      name: body.name,
      product: { id: body.productId },
    })
    const [err] = await to(this.repository.save(created))

    if (err) {
      changeError(err)
    }
  }
}
