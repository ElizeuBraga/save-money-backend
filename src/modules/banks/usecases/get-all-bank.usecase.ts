import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateBankDto } from '../dto/paginate-bank.dto'
import { User } from '../../common/entities/user.entity'
import { executaPaginacao } from '../../common/utils/exec-query-paginada.util'

@Injectable()
export class PaginateBankUsecase {
  roles = [RoleEnum.BANK_READ]

  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(body: PaginateBankDto, user: User) {
    this.authorizationService.validate(user, this.roles)

    const query = this.repository
      .createQueryBuilder('bank')
      .select(['bank.id', 'bank.name'])

    this.aplicarFiltros(query, body)

    return await executaPaginacao(query, body)
  }

  private aplicarFiltros(
    query: SelectQueryBuilder<Bank>,
    body: PaginateBankDto,
  ) {
    if (body.nameContains) {
      query.where('bank.name LIKE :name COLLATE NOCASE', {
        name: `%${body.nameContains.trim()}%`,
      })
    }
  }
}
