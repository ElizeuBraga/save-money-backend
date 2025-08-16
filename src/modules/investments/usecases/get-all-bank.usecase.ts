import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import sumBy from '../../common/utils/sum-by.util'
import percent from '../../common/utils/percent.util.'

@Injectable()
export class PaginateBankUsecase {
  roles = [RoleEnum.BANK_READ]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const banks = await this.repository.find({
      select: {
        id: true,
        name: true,
        investments: { id: true, price: true, paper: { id: true, name: true } },
      },
      relations: ['investments.paper'],
    })

    const investments = banks.flatMap((bank) => bank.investments)
    const totalInvested = sumBy(investments, 'price')

    for (const bank of banks) {
      bank.totalInvested = sumBy(bank.investments, 'price')
      bank.percentInvested = percent(bank.totalInvested, totalInvested)
    }

    return banks
  }
}
