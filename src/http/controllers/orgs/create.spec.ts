import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Pet org fundation',
      email: 'pet_org_fundation@org.com',
      password: '123456'
    });

    expect(response.statusCode).toEqual(201);
  });
});
