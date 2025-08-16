import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Paper } from '../../common/entities/Paper.entity'

@Injectable()
export class GetPapersUsecase {
  roles = [RoleEnum.PAPER_READ]

  constructor(
    @InjectRepository(Paper)
    private readonly repository: Repository<Paper>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async exec() {
    this.authorizationService.validate(this.roles)

    return await this.repository.find({
      select: {
        id: true,
        name: true,
        product: {
          id: true,
          category: {
            id: true,
          },
        },
      },
      relations: ['product.category'],
    })
  }
}
