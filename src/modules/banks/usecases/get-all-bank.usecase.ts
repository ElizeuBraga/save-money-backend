import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import { User } from '../../common/entities/user.entity'

@Injectable()
export class PaginateBankUsecase {
  roles = [RoleEnum.BANK_READ]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(user: User) {
    this.authorizationService.validate(user, this.roles)

    return this.repository.find({
      select: { id: true, name: true },
    })
  }
}
