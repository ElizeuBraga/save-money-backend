import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateBankDto } from '../dto/paginate-bank.dto'
import { User } from '../../common/entities/user.entity'

@Injectable()
export class PaginateBankUsecase {
  roles = [RoleEnum.BANK_READ]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: PaginateBankDto, user: User) {
    console.log(body)
    this.authorizationService.validate(user, this.roles)

    const banks = await this.repository.find({
      select: { id: true, name: true },
    })

    if (!banks.length) {
      throw new NotFoundException(`Cotação não encontrada`)
    }
  }
}
