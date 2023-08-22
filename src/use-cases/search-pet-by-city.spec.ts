import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsByCityUseCase } from './search-pet-by-city'
import { OrgsByCityNotFoundError } from './errors/org-by-city-not-found-error'
import { QueryNotInformedError } from './errors/query-not-Informed-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityUseCase

describe('Get Org Profile Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCityUseCase(orgsRepository, petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create({
      name: 'org1 name',
      email: 'org1@mail.com',
      city: 'org1 city',
      state: 'org1 state',
      address: 'org1 address',
      address_number: 'org1 address_number',
      password_hash: 'org1 password_hash',
      phone: 'org1 phone',
    })

    const pet = await petsRepository.create({
      name: 'pet1 name',
      age: 1,
      org_id: org.id,
      height: 1,
      weight: 1,
    })

    const { pets } = await sut.execute({
      query: 'org1 city',
    })

    expect(pets).toEqual([pet])
    expect(pets).toHaveLength(1)
  })

  it('should not be able to search pets by city with not informed query', async () => {
    await expect(() =>
      sut.execute({
        query: '',
      }),
    ).rejects.toBeInstanceOf(QueryNotInformedError)
  })

  it('should not be able to search pets by city with wrong query', async () => {
    await expect(() =>
      sut.execute({
        query: 'non-existing-query',
      }),
    ).rejects.toBeInstanceOf(OrgsByCityNotFoundError)
  })
})
