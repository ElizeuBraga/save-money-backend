import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { User } from '../../common/entities/user.entity'
import { CreateInvestmentDto } from '../dto/create-investment.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Investment } from '../../common/entities/Investment.entity'

@Injectable()
export class CreateInvesmentUsecase {
  roles = [RoleEnum.INVESTMENT_CREATE]

  constructor(
    @InjectRepository(Investment)
    private readonly repository: Repository<Investment>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: CreateInvestmentDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    const created = this.repository.create({
      paper: { id: body.paperId },
      bank: { id: body.bankId },
      user: { id: user.id },
      price: body.price,
    })

    const [err] = await to(this.repository.save(created))

    if (err) {
      changeError(err)
    }
  }
}
