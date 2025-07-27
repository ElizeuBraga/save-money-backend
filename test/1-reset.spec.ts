import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { createTestApp } from './utils/test-setup'

describe('Auth', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    app = await createTestApp()
  })

  it('Reset', () => {
    return request(app.getHttpServer()).post('/reset').expect([201])
  })

  it('Alive', () => {
    return request(app.getHttpServer()).get('/reset').expect([200])
  })
})
