import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { RoleEnum } from 'src/modules/common/types/enum'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { to } from '../../common/utils/to.util'
import { changeError } from '../../common/utils/change-error.util'
import { Todo } from '../../common/entities/todo.entity'
import { TodoCreateDto } from '../dto/todo-create.dto'

@Injectable()
export class TodoCreateUsecase {
  roles = [RoleEnum.CATEGORY_CREATE]

  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Transactional()
  async exec(body: TodoCreateDto) {
    this.authorizationService.validate(this.roles)

    const todo = this.repository.create(body)
    const [err] = await to(this.repository.save(todo))

    if (err) {
      changeError(err)
    }
  }
}
