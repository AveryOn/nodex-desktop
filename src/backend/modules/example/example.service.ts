import { ExampleServicePort } from './ports/example.port'

export class ExampleService implements ExampleServicePort {
  async list() {
    return []
  }

  async create(input: unknown) {
    return input
  }
}
