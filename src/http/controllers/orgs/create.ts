import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email().max(255),
    password: z.string().min(6).max(255)
  });

  const { name, email, password } = createBodySchema.parse(request.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();
    await createOrgUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
