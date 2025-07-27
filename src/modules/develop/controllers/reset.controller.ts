import { Controller, Post } from '@nestjs/common'
import { Public } from '../../auth/utils/public.metadata'
import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'

@Controller('reset')
export class ResetController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Public()
  @Post()
  async reset() {
    if (process.env.NODE_ENV == 'development') {
      await this.dataSource.dropDatabase()
      await this.dataSource.synchronize()
    }
  }
}
