import { Body, Controller, Get, Post } from '@nestjs/common'
import { PaginateProductUsecase } from '../usecases/paginate-product.usecase'
import { CreateProductDto } from '../dto/create-product.dto'
import { CreateProductUsecase } from '../usecases/create-product.usecase'

@Controller('products')
export class ProductController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateProductUsecase,
    private readonly createProductUsecase: CreateProductUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return await this.createProductUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateCategoryUsecase.exec()
  }
}
