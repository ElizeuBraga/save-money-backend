import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { PaperPaginateUsecase } from '../usecases/paper-paginate.usecase'
import { PaperCreateDto } from '../dto/paper-create.dto'
import { PaperCreateUsecase } from '../usecases/paper-create.usecase'
import { PaperUpdateDto } from '../dto/paper-update.dto'
import { PaperUpdateUsecase } from '../usecases/paper-update.usecase'
import { PapersGetUsecase } from '../usecases/papers-get.usecase'

@Controller('papers')
export class PaperController {
  constructor(
    private readonly paginateCategoryUsecase: PaperPaginateUsecase,
    private readonly createCategoryUsecase: PaperCreateUsecase,
    private readonly updatePaperUsecase: PaperUpdateUsecase,
    private readonly getPapersUsecase: PapersGetUsecase,
  ) {}

  @Post()
  async create(@Body() body: PaperCreateDto) {
    return await this.createCategoryUsecase.exec(body)
  }

  @Put()
  async update(@Body() body: PaperUpdateDto) {
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
