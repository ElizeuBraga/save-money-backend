import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { PaginateProductUsecase } from '../usecases/paginate-product.usecase'
import { ProductCreateDto } from '../dto/product-create.dto'
import { ProductCreateUsecase } from '../usecases/product-create.usecase'
import { ProductUpdateDto } from '../dto/product-update.dto'
import { ProductUpdateUsecase } from '../usecases/product-update.usecase'
import { ProductPaginateDto } from '../dto/product-paginate.dto'

@Controller('products')
export class ProductController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateProductUsecase,
    private readonly createProductUsecase: ProductCreateUsecase,
    private readonly updateProductUsecase: ProductUpdateUsecase,
  ) {}

  @Post()
  async create(@Body() body: ProductCreateDto) {
    return await this.createProductUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: ProductUpdateDto) {
    return await this.updateProductUsecase.exec(body)
  }

  @Get()
  async paginate(@Query() body: ProductPaginateDto) {
    return this.paginateCategoryUsecase.exec(body)
  }
}
