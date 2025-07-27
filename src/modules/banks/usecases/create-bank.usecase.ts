import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import { User } from '../../common/entities/user.entity'
import { CreateBankDto } from '../dto/create-bank.dto'

@Injectable()
export class CreateBankUsecase {
  roles = [RoleEnum.BANK_READ]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: CreateBankDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    return this.repository.save(body)
  }
}
