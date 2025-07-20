import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { createTestApp, getToken } from './utils/test-setup'

let token = ''
describe('Banks', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    app = await createTestApp()
    token = await getToken(app)
  })

  it('Get all', () => {
    return request(app.getHttpServer())
      .get('/banks')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })
})
