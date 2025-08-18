import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { createTestApp, getToken } from './utils/test-setup'
import { Category } from '../src/modules/common/entities/InvestmentCategory.entity'

const endPoint = '/products'
let token = ''
describe('Products', () => {
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
    const response = await request(app.getHttpServer())
      .get(endPoint)
      .set('Authorization', `Bearer ${token}`)

    const category = response.body.category[0] as Category

    await request(app.getHttpServer())
      .post(endPoint)
      .send({ name: category.name, categoryId: category.id })
      .set('Authorization', `Bearer ${token}`)
      .expect([201, 409])
  })
})
