import { Body, Controller, Get, Post } from '@nestjs/common'
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
  async create(@Body() body: CreatePaperDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateCategoryUsecase.exec()
  }
}
