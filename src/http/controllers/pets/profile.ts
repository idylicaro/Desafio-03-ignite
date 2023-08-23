import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'
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

  const getOrgProfileUseCase = makeGetOrgProfileUseCase()
  const { org } = await getOrgProfileUseCase.execute({
    orgId: pet.org_id,
  })

  return reply.status(200).send({
    pet,
    whatsapp_link: `https://wa.me/${org.phone}?text=Hello, I'm interested in adopting ${pet.name}!`,
  })
}
