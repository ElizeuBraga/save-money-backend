import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { operationIdFactory } from './modules/common/utils/swagger-operation-id-factory.util'
import * as process from 'node:process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appPrefix = process.env.PREFIX || '/api'

  app.setGlobalPrefix(appPrefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })

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
