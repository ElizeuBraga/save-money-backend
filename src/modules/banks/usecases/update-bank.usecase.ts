import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { UpdateBankDto } from '../dto/update-bank.dto'

@Injectable()
export class UpdateBankUsecase {
  roles = [RoleEnum.BANK_UPDATE]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: UpdateBankDto) {
    this.authorizationService.validate(this.roles)

    const [err] = await to(this.repository.save(body))

    if (err) {
      changeError(err)
    }
  }
}
