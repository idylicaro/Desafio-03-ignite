import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      address_number: data.address_number,
      city: data.city,
      state: data.state,
      phone: data.phone,
      role: data.role ?? 'ADMIN',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findManyByCity(query: string) {
    const orgs = this.items.filter((item) => item.city.includes(query))

    return orgs
  }
}
