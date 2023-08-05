import { Org } from '@prisma/client';
import { OrgsRepository } from '@/repositories/orgs-repository';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 10);

    const orgWithSameEmail = await this.orgRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash
    });

    return {
      org
    };
  }
}
