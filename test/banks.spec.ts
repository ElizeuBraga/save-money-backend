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
      .expect(200)
  })

  it('Create', async () => {
    const banks = [
      {
        name: 'Nubank',
        logo: 'logo.png',
      },
      {
        name: 'C6',
        logo: 'logo.png',
      },
      {
        name: 'Inter',
        logo: 'logo.png',
      },
      {
        name: 'Neon',
        logo: 'logo.png',
      },
    ]
    for (const bank of banks) {
      await request(app.getHttpServer())
        .post('/banks')
        .send({ name: bank.name, logo: bank.logo })
        .set('Authorization', `Bearer ${token}`)
        .expect([201, 409])
    }
  })
})
