import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { GetOrgProfileUseCase } from './get-org-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let repository: InMemoryOrgsRepository
let service: GetOrgProfileUseCase

describe('Get Org Profile Service', () => {
  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    service = new GetOrgProfileUseCase(repository)
  })

  it('should be able to get org profile', async () => {
    const orgCreated = await repository.create({
      name: 'org1 name',
      email: 'org@mail.com',
      password_hash: await hash('123456', 6),
      address: 'org1 address',
      address_number: 'org1 address_number',
      city: 'org1 city',
      state: 'org1 state',
      phone: 'org1 phone',
    })

    const { org } = await service.execute({
      orgId: orgCreated.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('org1 name')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      service.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
