import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { User } from '../../common/entities/user.entity'
import { Paper } from '../../common/entities/Paper.entity'

@Injectable()
export class PaginatePaperUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(user: User) {
    this.authorizationService.validate(user, this.roles)

    return this.repository.find({
      select: { id: true, name: true },
    })
  }
}
