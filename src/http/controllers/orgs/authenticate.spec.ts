import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet org fundation',
      email: 'pet_org_fundation@org.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua dos bobos',
      address_number: '0',
      phone: '11999999999',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'pet_org_fundation@org.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
