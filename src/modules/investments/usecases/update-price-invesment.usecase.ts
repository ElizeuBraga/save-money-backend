import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { User } from '../../common/entities/user.entity'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Investment } from '../../common/entities/Investment.entity'
import { InvestmentHistory } from '../../common/entities/InvestmentHistory.entity'
import { InvestmentActionEnum } from '../types/enum'
import { UpdatePriceInvestmentDto } from '../dto/update-price-investment.dto'

@Injectable()
export class UpdatePriceInvesmentUsecase {
  roles = [RoleEnum.INVESTMENT_UPDATE]

  constructor(
    @InjectRepository(Investment)
    private readonly repository: Repository<Investment>,
    @InjectRepository(InvestmentHistory)
    private readonly investmentHistoryRepository: Repository<InvestmentHistory>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(id: string, body: UpdatePriceInvestmentDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    const [err] = await to(
      this.repository.save({
        id: id,
        price: body.price,
      }),
    )

    if (err) {
      changeError(err)
    }

    await this.createHistory(id, body)
  }

  private async createHistory(id: string, body: UpdatePriceInvestmentDto) {
    const created = this.investmentHistoryRepository.create({
      investment: { id },
      price: body.price,
      action: InvestmentActionEnum.UPDATE_PRICE,
    })

    return await to(this.investmentHistoryRepository.save(created))
  }
}
