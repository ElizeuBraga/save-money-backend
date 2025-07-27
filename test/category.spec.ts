import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { createTestApp, getToken } from './utils/test-setup'
import { Category } from '../src/modules/common/entities/Category.entity'

const endPoint = '/categories'
let token = ''
describe('Categories', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    app = await createTestApp()
    token = await getToken(app)
  })

  it('Get all', () => {
    return request(app.getHttpServer())
      .get(endPoint)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('Create', async () => {
    const objects: Array<Partial<Category>> = [
      {
        name: 'Renda Fixa',
      },
      {
        name: 'Renda Variável',
      },
    ]
    for (const obj of objects) {
      await request(app.getHttpServer())
        .post(endPoint)
        .send({ name: obj.name })
        .set('Authorization', `Bearer ${token}`)
        .expect([201, 409])
    }
  })
})
