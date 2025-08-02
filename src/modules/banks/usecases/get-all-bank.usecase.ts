import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'

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

    const total = this.totalInvested(banks)

    for (const bank of banks) {
      bank.totalInvested = this.totalInvestedByBank(bank)
      const percent = (bank.totalInvested * 100) / total
      bank.percentInvested = parseFloat(percent.toFixed(2))
    }

    return banks
  }

  private totalInvested(banks: Bank[]) {
    return banks
      .map((bank) => bank.investments)
      .map((investment) => investment)
      .flat()
      .map((investment) => investment.price)
      .reduce((acc, curr) => acc + curr, 0)
  }

  private totalInvestedByBank(bank: Bank) {
    return bank.investments
      .map((investment) => investment.price)
      .reduce((acc, curr) => acc + curr, 0)
  }
}
