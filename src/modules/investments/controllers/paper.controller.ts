import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { PaginatePaperUsecase } from '../usecases/paginate-paper.usecase'
import { CreatePaperDto } from '../dto/create-paper.dto'
import { CreatePaperUsecase } from '../usecases/create-paper.usecase'
import { UpdatePaperDto } from '../dto/update-paper.dto'
import { UpdatePaperUsecase } from '../usecases/update-paper.usecase'
import { GetPapersUsecase } from '../usecases/get-papers.usecase'

@Controller('papers')
export class PaperController {
  constructor(
    private readonly paginateCategoryUsecase: PaginatePaperUsecase,
    private readonly createCategoryUsecase: CreatePaperUsecase,
    private readonly updatePaperUsecase: UpdatePaperUsecase,
    private readonly getPapersUsecase: GetPapersUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreatePaperDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: UpdatePaperDto) {
    return await this.updatePaperUsecase.exec(body)
  }

  @Get()
  async paginate() {
    return this.paginateCategoryUsecase.exec()
  }

  @Get('/list')
  async getPapers() {
    return this.getPapersUsecase.exec()
  }
}
