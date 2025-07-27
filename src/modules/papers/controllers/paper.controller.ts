import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginatePaperUsecase } from '../usecases/paginate-paper.usecase'
import { Bank } from '../../common/entities/bank.entity'
import { PaginatePaperDto } from '../dto/paginate-paper.dto'
import { ApiOkResponsePaged } from '../../common/decorators/api-ok-response-paged.metadata'
import { CreatePaperDto } from '../dto/create-paper.dto'
import { CreatePaperUsecase } from '../usecases/create-paper.usecase'

@Controller('papers')
export class PaperController {
  constructor(
    private readonly paginateCategoryUsecase: PaginatePaperUsecase,
    private readonly createCategoryUsecase: CreatePaperUsecase,
  ) {}

  @Post()
  async create(
    @Request() { user }: { user: User },
    @Body() body: CreatePaperDto,
  ) {
    return await this.createCategoryUsecase.exec(body, user)
  }

  @ApiOkResponsePaged(Bank)
  @Get()
  async paginate(
    @Query() body: PaginatePaperDto,
    @Request() { user }: { user: User },
  ) {
    return this.paginateCategoryUsecase.exec(body, user)
  }
}
