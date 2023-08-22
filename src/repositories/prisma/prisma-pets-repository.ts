import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, Query } from '../pets-repository'
export class PrismaPetsRepository implements PetsRepository {
  findManyForAdoption(
    orgsId: string[],
    query: Query,
  ): Promise<
    {
      id: string
      name: string
      age: number
      height: number
      weight: number
      created_at: Date
      updated_at: Date
      adopted_at: Date | null
      org_id: string
    }[]
  > {
    const pets = prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
        adopted_at: null,
        age: query.age,
        height: query.height,
        weight: query.weight,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
