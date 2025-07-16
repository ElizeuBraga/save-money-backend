import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional'
import { DataSource } from 'typeorm'
export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()

  const dataSource = app.get(DataSource)

  // Configura o recurso da annotation @Transaction
  // para transacionar tudo dentro da function executada
  initializeTransactionalContext({
    storageDriver: StorageDriver.AUTO,
  })
  addTransactionalDataSource(dataSource)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return await app.init()
}
