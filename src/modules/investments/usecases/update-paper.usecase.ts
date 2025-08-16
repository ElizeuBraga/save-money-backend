import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Paper } from '../../common/entities/Paper.entity'
import { UpdatePaperDto } from '../dto/update-paper.dto'

@Injectable()
export class UpdatePaperUsecase {
  roles = [RoleEnum.PAPER_UPDATE]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: UpdatePaperDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(this.repository.save(body))

    if (err) {
      changeError(err)
    }
  }
}
