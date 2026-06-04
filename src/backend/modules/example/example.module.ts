import { ExampleService } from './example.service'
import { ExampleServicePort } from './ports/example.port'

export class ExampleModule {
  readonly service: ExampleServicePort

  constructor() {
    this.service = new ExampleService()
  }
}
