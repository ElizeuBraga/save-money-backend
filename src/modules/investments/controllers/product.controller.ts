import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { PaginateProductUsecase } from '../usecases/paginate-product.usecase'
import { CreateProductDto } from '../dto/create-product.dto'
import { CreateProductUsecase } from '../usecases/create-product.usecase'
import { UpdateProductDto } from '../dto/update-product.dto'
import { UpdateProductUsecase } from '../usecases/update-product.usecase'
import { PaginateProductDto } from '../dto/paginate-product.dto'

@Controller('products')
export class ProductController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateProductUsecase,
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly updateProductUsecase: UpdateProductUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return await this.createProductUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: UpdateProductDto) {
    return await this.updateProductUsecase.exec(body)
  }

  @Get()
  async paginate(@Query() body: PaginateProductDto) {
    return this.paginateCategoryUsecase.exec(body)
  }
}
