import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CategoryPaginateUsecase } from '../usecases/category-paginate.usecase'
import { CategoryCreateDto } from '../dto/category-create.dto'
import { CategoryCreateUsecase } from '../usecases/category-create.usecase'
import { CategoryUpdateDto } from '../dto/category-update.dto'
import { CategoryUpdateUsecase } from '../usecases/category-update.usecase'
import { CategoriesGetUsecase } from '../usecases/categories-get.usecase'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly paginateCategoryUsecase: CategoryPaginateUsecase,
    private readonly createCategoryUsecase: CategoryCreateUsecase,
    private readonly updateCategoryUsecase: CategoryUpdateUsecase,
    private readonly getCategoriesUsecase: CategoriesGetUsecase,
  ) {}

  @Post()
  async create(@Body() body: CategoryCreateDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: CategoryUpdateDto) {
    return await this.updateCategoryUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateCategoryUsecase.exec()
  }

  @Get('/list')
  async getCategories() {
    return this.getCategoriesUsecase.exec()
  }
}
