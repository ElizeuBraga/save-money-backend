import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import {
  addTransactionalDataSource,
  getDataSourceByName,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional'
import { DataSource } from 'typeorm'

let transactionalContextInitialized = false
export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()

  const dataSource = app.get(DataSource)

  if (!transactionalContextInitialized) {
    initializeTransactionalContext({
      storageDriver: StorageDriver.AUTO,
    })

    transactionalContextInitialized = true

    addTransactionalDataSource(dataSource)
  } else {
    getDataSourceByName('default')
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return await app.init()
}
