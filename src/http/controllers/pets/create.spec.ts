import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create', async () => {
    const { id, token } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Pet org fundation',
        age: 5,
        height: 1.5,
        weight: 5,
        org_id: id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
