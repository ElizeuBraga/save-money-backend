import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { PaginateCategoryUsecase } from '../usecases/paginate-category.usecase'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { CreateCategoryUsecase } from '../usecases/create-category.usecase'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { UpdateCategoryUsecase } from '../usecases/update-category.usecase'
import { GetCategoriesUsecase } from '../usecases/get-categories.usecase'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateCategoryUsecase,
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
    private readonly getCategoriesUsecase: GetCategoriesUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: UpdateCategoryDto) {
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
