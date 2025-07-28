import { Body, Controller, Get, Post } from '@nestjs/common'
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
  async create(@Body() body: CreateCategoryDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateCategoryUsecase.exec()
  }
}
