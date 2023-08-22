import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, Query } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      height: data.height,
      weight: data.weight,
      org_id: data.org_id,
      created_at: new Date(),
      updated_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)

    return pet
  }

  async findManyForAdoption(orgsId: string[], query: Query) {
    // get all pets into orgsId and that are not adopted
    let pets = this.items.filter(
      (item) => orgsId.includes(item.org_id) && !item.adopted_at,
    )

    // filter by age
    if (query.age) {
      pets = pets.filter((item) => item.age === query.age)
    }

    // filter by height
    if (query.height) {
      pets = pets.filter((item) => item.height === query.height)
    }

    // filter by weight
    if (query.weight) {
      pets = pets.filter((item) => item.weight === query.weight)
    }

    return pets
  }
}
