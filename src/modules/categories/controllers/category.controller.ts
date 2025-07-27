import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginateCategoryUsecase } from '../usecases/paginate-category.usecase'
import { Bank } from '../../common/entities/bank.entity'
import { PaginateCategoryDto } from '../dto/paginate-category.dto'
import { ApiOkResponsePaged } from '../../common/decorators/api-ok-response-paged.metadata'
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

  @ApiOkResponsePaged(Bank)
  @Get()
  async paginate(
    @Query() body: PaginateCategoryDto,
    @Request() { user }: { user: User },
  ) {
    return this.paginateCategoryUsecase.exec(body, user)
  }
}
