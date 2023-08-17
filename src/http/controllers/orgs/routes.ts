import { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
  app.post('/orgs', create)

  // Authenticated routes
  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}
