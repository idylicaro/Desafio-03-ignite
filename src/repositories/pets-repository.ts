import { Pet, Prisma } from '@prisma/client'

export interface Query {
  age?: number | undefined
  height?: number | undefined
  weight?: number | undefined
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyForAdoption(orgsId: string[], query: Query): Promise<Pet[]>
}
