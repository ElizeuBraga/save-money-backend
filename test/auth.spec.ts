import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { createTestApp } from './utils/test-setup'
import { ulid } from 'ulid'

describe('Auth', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    app = await createTestApp()
  })

  it('Register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: `Elizeu`,
        email: `elizeubragasantos@gmail.com`,
        password: 'save',
      })
      .expect([201, 409])
  })

  it('Login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: `elizeubragasantos@gmail.com`,
        password: 'save',
      })
      .expect([200, 401])
  })
})
