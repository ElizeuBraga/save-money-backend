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
    const ulidUser = ulid()
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: `Name ${ulidUser}`,
        email: `${ulidUser}@gmail.com`,
        password: '123456',
      })
      .expect([201, 409])
  })
})
