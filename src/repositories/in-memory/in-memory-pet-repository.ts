import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
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

  async findManyForAdoption(orgsId: string[]) {
    // get all pets into orgsId and that are not adopted
    const pets = this.items.filter(
      (item) => orgsId.includes(item.org_id) && !item.adopted_at,
    )
    return pets
  }
}
