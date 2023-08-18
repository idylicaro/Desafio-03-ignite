import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
      name: 'org1',
      email: 'org1@example.com',
      address: 'address',
      address_number: 'address_number',
      password_hash: '123456',
      city: 'city',
      state: 'state',
      phone: '11999999999',
    })
  })

  it('should create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'pet1',
      age: 1,
      height: 1,
      weight: 1,
      org_id: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw if org does not exist', async () => {
    await expect(
      sut.execute({
        name: 'pet1',
        age: 1,
        height: 1,
        weight: 1,
        org_id: 'org-not-exists-id',
      }),
    ).rejects.toThrow(OrgNotFoundError)
  })
})
