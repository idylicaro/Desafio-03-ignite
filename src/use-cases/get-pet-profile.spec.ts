import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let repository: InMemoryPetsRepository
let service: GetPetProfileUseCase

describe('Get Pet Profile Service', () => {
  beforeEach(() => {
    repository = new InMemoryPetsRepository()
    service = new GetPetProfileUseCase(repository)
  })

  it('should be able to get pet profile', async () => {
    const petCreated = await repository.create({
      name: 'pet1 name',
      age: 1,
      height: 1,
      weight: 1,
      org_id: 'org1 id',
    })

    const { pet } = await service.execute({
      petId: petCreated.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('pet1 name')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      service.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
