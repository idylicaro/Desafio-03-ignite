import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyOrgRole } from '@/http/middlewares/verify-role-org'
import { FastifyInstance } from 'fastify'

import { create } from './create'
import { search } from './search'
import { profile } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [verifyJwt, verifyOrgRole('ADMIN')],
    },
    create,
  )

  app.get('/pets/search', search)
  app.get('/pets/:petId', profile)
}
