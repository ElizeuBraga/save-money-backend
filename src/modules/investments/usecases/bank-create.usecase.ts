import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import { BankCreateDto } from '../dto/bank-create.dto'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'

@Injectable()
export class BankCreateUsecase {
  roles = [RoleEnum.BANK_CREATE]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: BankCreateDto) {
    this.authorizationService.validate(this.roles)

    const bank = this.repository.create(body)
    const [err] = await to(this.repository.save(bank))

    if (err) {
      changeError(err)
    }
  }
}
