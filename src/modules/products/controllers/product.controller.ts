import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateProductUsecase } from '../usecases/paginate-product.usecase'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateProductDto } from '../dto/paginate-product.dto'
import { ApiOkResponsePaged } from '../../common/decorators/api-ok-response-paged.metadata'
import { CreateProductDto } from '../dto/create-product.dto'
import { CreateProductUsecase } from '../usecases/create-product.usecase'

@Controller('products')
export class ProductController {
  constructor(
    private readonly paginateCategoryUsecase: PaginateProductUsecase,
    private readonly createCategoryUsecase: CreateProductUsecase,
  ) {}

  @Post()
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreateProductDto,
  ) {
    return await this.createCategoryUsecase.exec(body, user)
  }

  @ApiOkResponsePaged(Bank)
  @Get()
  async paginate(
    @Query() body: PaginateProductDto,
    @Request() { user }: { user: User },
  ) {
    return this.paginateCategoryUsecase.exec(body, user)
  }
}
