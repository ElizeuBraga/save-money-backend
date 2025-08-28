import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { TodoCreateUsecase } from '../usecases/todo-create.usecase'
import { TodoCreateDto } from '../dto/todo-create.dto'
import { TodoPaginateUsecase } from '../usecases/todo-paginate.usecase'
import { TodoDeleteUsecase } from '../usecases/todo-delete.usecase'

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoCreateUsecase: TodoCreateUsecase,
    private readonly todoPaginateUsecase: TodoPaginateUsecase,
    private readonly deleteUsecase: TodoDeleteUsecase,
  ) {}

  @Post()
  async create(@Body() body: TodoCreateDto) {
    return await this.todoCreateUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return await this.todoPaginateUsecase.exec()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUsecase.exec(id)
  }
}
