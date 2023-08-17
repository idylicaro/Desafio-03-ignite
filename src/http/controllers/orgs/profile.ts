import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const service = makeGetOrgProfileUseCase()

  const { org } = await service.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password: undefined,
    },
  })
}
