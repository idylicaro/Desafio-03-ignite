export class OrgsByCityNotFoundError extends Error {
  constructor() {
    super('Orgs by city not found.')
  }
}
