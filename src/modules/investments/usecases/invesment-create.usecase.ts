import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { InvestmentCreateDto } from '../dto/investment-create.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Investment } from '../../common/entities/Investment.entity'
import { InvestmentHistory } from '../../common/entities/InvestmentHistory.entity'
import { InvestmentActionEnum } from '../types/enum'

@Injectable()
export class InvesmentCreateUsecase {
  roles = [RoleEnum.INVESTMENT_CREATE]

  constructor(
    @InjectRepository(Investment)
    private readonly repository: Repository<Investment>,
    @InjectRepository(InvestmentHistory)
    private readonly investmentHistoryRepository: Repository<InvestmentHistory>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: InvestmentCreateDto) {
    const userId = this.authorizationService.validate(this.roles)

    const created = this.repository.create({
      paper: { id: body.paperId },
      bank: { id: body.bankId },
      user: { id: userId },
      price: body.price,
    })

    const [err] = await to(this.repository.save(created))

    if (err) {
      changeError(err)
    }

    await this.createHistory(body, created)
  }

  private async createHistory(
    body: InvestmentCreateDto,
    investment: Investment,
  ) {
    const created = this.investmentHistoryRepository.create({
      investment: { id: investment.id },
      price: body.price,
      action: InvestmentActionEnum.CREATE,
    })

    return await to(this.investmentHistoryRepository.save(created))
  }
}
