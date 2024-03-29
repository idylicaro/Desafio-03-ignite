import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
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
      query: { city: 'org1 city' },
    })

    expect(pets).toEqual([pet])
    expect(pets).toHaveLength(1)
  })

  it('should not be able to search pets by city with not informed query', async () => {
    await expect(() =>
      sut.execute({
        query: { city: '' },
      }),
    ).rejects.toBeInstanceOf(QueryNotInformedError)
  })

  it('should not be able to search pets by city with wrong query', async () => {
    await expect(() =>
      sut.execute({
        query: { city: 'wrong city' },
      }),
    ).rejects.toBeInstanceOf(OrgsByCityNotFoundError)
  })

  it('should empty array if not pets able to adopt', async () => {
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

    await petsRepository.create({
      name: 'pet1 name',
      age: 1,
      org_id: org.id,
      height: 1,
      weight: 1,
      adopted_at: new Date(),
    })

    const { pets } = await sut.execute({
      query: { city: 'org1 city' },
    })

    expect(pets).toEqual([])
  })

  it('should be able to search pets by city with age', async () => {
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

    await petsRepository.create({
      name: 'pet1 name',
      age: 1,
      org_id: org.id,
      height: 1,
      weight: 1,
    })

    await petsRepository.create({
      name: 'pet2 name',
      age: 2,
      org_id: org.id,
      height: 2,
      weight: 2,
    })

    const { pets } = await sut.execute({
      query: { city: 'org1 city', age: 1 },
    })

    expect(pets).toHaveLength(1)
  })
})
