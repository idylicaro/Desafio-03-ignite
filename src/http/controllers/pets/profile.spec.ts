import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Pet Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet profile', async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true)
    await request(app.server)
      .post('/pets')
      .send({
        name: 'Pet org fundation',
        age: 5,
        height: 1.5,
        weight: 5,
        org_id: id,
      })
      .set('Authorization', `Bearer ${token}`)

    const searchResponse = await request(app.server)
      .get('/pets/search')
      .query({ city: 'São Paulo' })

    const petId = searchResponse.body.pets[0].id

    const response = await request(app.server).get(`/pets/${petId}`)
    expect(response.statusCode).toEqual(200)
  })
})
