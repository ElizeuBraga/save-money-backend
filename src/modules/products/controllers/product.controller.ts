import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
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
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateProductDto,
  ) {
    return await this.createProductUsecase.exec(body, user)
  }

  @Get()
  async paginate(@Request() { user }: { user: User }) {
    return this.paginateCategoryUsecase.exec(user)
  }
}
