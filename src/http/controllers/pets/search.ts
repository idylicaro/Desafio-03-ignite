import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchPetByCityUseCase } from '@/use-cases/factories/make-search-pet-by-city-use-case'
import { z } from 'zod'
import { QueryNotInformedError } from '@/use-cases/errors/query-not-Informed-error'
import { OrgsByCityNotFoundError } from '@/use-cases/errors/org-by-city-not-found-error'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createQuerySchema = z.object({
    query: z.string().min(3).max(255),
  })

  const { query } = createQuerySchema.parse(request.query)

  try {
    const searchPetByCityUseCase = makeSearchPetByCityUseCase()
    const pets = await searchPetByCityUseCase.execute({
      query,
    })
    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof QueryNotInformedError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof OrgsByCityNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
