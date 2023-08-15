import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reporitory'
import { AuthenticateUseCase } from './authenticate'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate UseCase', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('Should be able to authenticate an org', async () => {
    await orgsRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password_hash: await hash('123456', 6),
      address: 'any_address',
      address_number: 'any_address_number',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
    })

    const { org } = await sut.execute({
      email: 'any_email@mail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'not_org@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password_hash: await hash('123456', 6),
      address: 'any_address',
      address_number: 'any_address_number',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
    })

    await expect(() =>
      sut.execute({
        email: 'any_email@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
