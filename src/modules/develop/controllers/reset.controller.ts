import { Controller, Get, Post } from '@nestjs/common'
import { unlinkSync, existsSync } from 'fs'
import { writeFile } from 'fs/promises'
import { Public } from '../../auth/utils/public.metadata'

@Controller('reset')
export class ResetController {
  path: string
  constructor() {
    this.path = 'data/databaseTeste.sqlite'
  }

  @Public()
  @Get()
  alive() {
    return existsSync(this.path)
  }

  @Public()
  @Post()
  async reset() {
    if (process.env.NODE_ENV == 'development') {
      if (existsSync(this.path)) {
        unlinkSync(this.path)
      }
      await writeFile(this.path, '')
      return 'reseted'
    }
  }
}
