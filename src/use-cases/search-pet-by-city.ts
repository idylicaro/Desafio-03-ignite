import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { QueryNotInformedError } from './errors/query-not-Informed-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgsByCityNotFoundError } from './errors/org-by-city-not-found-error'

interface SearchPetsByCityUseCaseRequest {
  query: {
    age?: number | undefined
    height?: number | undefined
    weight?: number | undefined
    city: string
  }
}

interface SearchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    query,
  }: SearchPetsByCityUseCaseRequest): Promise<SearchPetsByCityUseCaseResponse> {
    if (!query || !query.city) {
      throw new QueryNotInformedError()
    }

    const orgs = await this.orgsRepository.findManyByCity(query.city)
    if (orgs.length === 0) {
      throw new OrgsByCityNotFoundError()
    }

    const orgsId = orgs.map((item) => item.id)

    const pets = await this.petsRepository.findManyForAdoption(orgsId, query)

    return { pets }
  }
}
