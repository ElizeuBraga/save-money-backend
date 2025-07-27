import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { User } from 'src/modules/common/entities/user.entity'
import { PaginatePaperUsecase } from '../usecases/paginate-paper.usecase'
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

  @Get()
  async paginate(@Request() { user }: { user: User }) {
    return this.paginateCategoryUsecase.exec(user)
  }
}
