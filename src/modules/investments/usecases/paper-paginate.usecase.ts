import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Paper } from '../../common/entities/Paper.entity'
import sumBy from '../../common/utils/sum-by.util'
import percent from '../../common/utils/percent.util.'

@Injectable()
export class PaperPaginateUsecase {
  roles = [RoleEnum.CATEGORY_READ]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    const papers = await this.repository.find({
      select: {
        id: true,
        name: true,
        investments: {
          id: true,
          price: true,
          bank: {
            id: true,
            name: true,
          },
        },
      },
      relations: ['investments.bank'],
    })

    const investments = papers.flatMap((paper) => paper.investments)
    const totalInvestments = sumBy(investments, 'price')
    for (const paper of papers) {
      paper.totalInvested = paper.totalInvested = sumBy(
        paper.investments,
        'price',
      )

      paper.percentInvested = percent(paper.totalInvested, totalInvestments)
    }

    return papers
  }
}
