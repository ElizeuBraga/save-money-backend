import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { Todo } from '../../common/entities/todo.entity'

@Injectable()
export class TodoPaginateUsecase {
  roles = [RoleEnum.CATEGORY_CREATE]

  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec() {
    this.authorizationService.validate(this.roles)

    return this.repository.find({})
  }
}
