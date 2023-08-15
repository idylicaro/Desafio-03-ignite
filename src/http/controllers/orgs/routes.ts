import { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
  app.post('/orgs', create)
}
