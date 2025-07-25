import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DataSource } from 'typeorm'
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { operationIdFactory } from './modules/common/utils/swagger-operation-id-factory.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appPrefix = process.env.PREFIX || '/api'

  const dataSource = app.get(DataSource)

  // Configura o recurso da annotation @Transaction
  // para transacionar tudo dentro da function executada
  initializeTransactionalContext({
    storageDriver: StorageDriver.AUTO,
  })
  addTransactionalDataSource(dataSource)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Save Money')
    .setDescription('API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      operationIdFactory,
    })
  SwaggerModule.setup(appPrefix, app, documentFactory, {
    jsonDocumentUrl: appPrefix + '/swagger.json',
  })

  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
