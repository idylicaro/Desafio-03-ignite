import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(3).max(255),
    age: z.number().min(1).max(100),
    height: z.number(),
    weight: z.number(),
    org_id: z.string().uuid(),
  })

  const { name, age, height, weight, org_id } = createBodySchema.parse(
    request.body,
  )

  try {
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      name,
      age,
      height,
      weight,
      org_id,
    })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
