import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateCategoryUsecase } from '../usecases/paginate-category.usecase'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { CreateCategoryUsecase } from '../usecases/create-category.usecase'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateCategoryUsecase,
    private readonly createCategoryUsecase: CreateCategoryUsecase,
  ) {}

  @Post()
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateCategoryDto,
  ) {
    return await this.createCategoryUsecase.exec(body, user)
  }

  @Get()
  async paginate(@Request() { user }: { user: User }) {
    return this.paginateCategoryUsecase.exec(user)
  }
}
