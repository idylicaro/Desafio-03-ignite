import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCityUseCase } from '../search-pet-by-city'

export function makeSearchPetByCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()

  const createPetUseCase = new SearchPetsByCityUseCase(
    orgsRepository,
    petsRepository,
  )
  return createPetUseCase
}
