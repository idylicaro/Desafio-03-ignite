import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getParamSchema = z.object({
    petId: z.coerce.string().uuid(),
  })
  const { petId } = getParamSchema.parse(request.params)
  const getPetProfileUseCase = makeGetPetProfileUseCase()

  const { pet } = await getPetProfileUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
