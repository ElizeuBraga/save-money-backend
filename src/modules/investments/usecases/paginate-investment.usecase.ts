import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { User } from '../../common/entities/user.entity'
import { Investment } from '../../common/entities/Investment.entity'

@Injectable()
export class PaginateInvestmentUsecase {
  roles = [RoleEnum.INVESTMENT_READ]

  constructor(
    @InjectRepository(Investment)
    private readonly repository: Repository<Investment>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec(user: User) {
    this.authorizationService.validate(user, this.roles)

    return this.repository.find({
      select: {
        id: true,
        price: true,
        paper: {
          id: true,
          name: true,
        },
        history: {
          price: true,
          action: true,
          createdAt: true,
        },
      },
      relations: ['paper', 'history'],
      where: {
        user: { id: user.id },
      },
    })
  }
}
