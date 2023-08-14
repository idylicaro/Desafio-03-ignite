import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should create a new org', async () => {
    const { org } = await sut.execute({
      name: 'org1 name',
      email: 'org1@org.com',
      password: '123456',
      address: 'org1 address',
      address_number: 'org1 address_number',
      city: 'org1 city',
      state: 'org1 state',
      phone: 'org1 phone',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon creation', async () => {
    const { org } = await sut.execute({
      name: 'org1 name',
      email: 'org1@org.com',
      password: '123456',
      address: 'org1 address',
      address_number: 'org1 address_number',
      city: 'org1 city',
      state: 'org1 state',
      phone: 'org1 phone',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to be able to create a new org with the same email twice', async () => {
    const email = 'org1@org.com'

    await sut.execute({
      name: 'org1 name',
      email,
      password: '123456',
      address: 'org1 address',
      address_number: 'org1 address_number',
      city: 'org1 city',
      state: 'org1 state',
      phone: 'org1 phone',
    })

    await expect(() =>
      sut.execute({
        name: 'org2 name',
        email,
        password: '123456',
        address: 'org1 address',
        address_number: 'org1 address_number',
        city: 'org1 city',
        state: 'org1 state',
        phone: 'org1 phone',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
